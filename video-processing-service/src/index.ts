import express from "express";
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setupDirectories,
  uploadProcessedVideo
} from "./cloudStorage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories();
const app = express();
app.use(express.json());
//Do not return res directly to avoid bug
app.post("/process-video", async (req, res) => {
  let data;
  try {
    const message = Buffer.from(req.body.message.data, "base64").toString(
      "utf8"
    );
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad Request: missing filename");
    return;
  }
  const inputFileName = data.name; //Format of <UID>-<DATE>.<EXTENSION>
  const outputFileName = `processed-${inputFileName}`;
  const videoId = inputFileName.split(".")[0];

  if (!isVideoNew(videoId)) {
    res.status(400).send(`Bad Request: video already processing or processed`);
    return;
  } else {
    let d = new Date();
    let uploadDate = d.toDateString();
    await setVideo(videoId, {
      id: videoId,
      uid: videoId.split("-")[0],
      date: uploadDate,
      status: "processing"
    });
  }

  //Download raw video from cloud storage
  await downloadRawVideo(inputFileName);

  //Convert video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.log(err);
    res.status(500).send("Internal Server Error: video processing failed. ");
    return;
  }

  //Upload processed video to cloud storage
  await uploadProcessedVideo(outputFileName);
  await setVideo(videoId, {
    status: "processed",
    filename: outputFileName
  });

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  res.status(200).send("Processing finished successfully");
  return;
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
