import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

/*Download from raw and upload to processed*/
const rawVideoBucketName = "064-yt-raw-videos";
const processedVideoBucketName = "064-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/*Creates local docker directories for raw and processed videos*/
export function setupDirectories() {}

/**
 * @param rawVideoName - Name fo file to convert from  {@link localRawVideoPath}
 * @param processedVideoName - Name of file to convert to {@link localProcessedVideoPath}
 * @returns Promised that resolves when video has been converted
 */

export function convertVideo(
  rawVideoName: string,
  processedVideoName: string
) {}
