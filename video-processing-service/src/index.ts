import express from "express";
import ffmpeg from "fluent-ffmpeg";
const app = express();

app.post("/process-video", (req, res) => {
  //Get path of input video from request body
  const inputFilePath = req.body.inputFilePath;
  const ouputFilePath = req.body.ouputFilePath;

  if (!inputFilePath || !ouputFilePath) {
    res.status(400).send("Bad Request: Missing file paths");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360") //360p
    .on("end", () => {
      res.status(200).send("Processing finished successfully.");
    })
    .on("error", (err) => {
      console.log(`An error occurred: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(ouputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
