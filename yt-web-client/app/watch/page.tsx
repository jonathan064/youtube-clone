"use client";
import { useSearchParams } from "next/navigation";

export default function Watch() {
  const videoPrefix = "https://storage.googleapis.com/064-yt-processed-videos/";
  const videoSrc = useSearchParams().get("v");
  return (
    <div>
      <video controls src={videoPrefix + videoSrc}></video>
    </div>
  );
}
