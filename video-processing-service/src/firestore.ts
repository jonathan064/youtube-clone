import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({ credential: credential.applicationDefault() });

const firestore = getFirestore("yt-clone-db");

const videoCollectionId = "videos";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string,
  date?: string
}

/**
 *
 * @param videoId - Id from video stored in firestore
 * @returns promise that resolves if video has been successfully retrieved or empty object otherwise
 */
async function getVideo(videoId: string) {
  const snapshot = await firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .get();
  return (snapshot.data() as Video) ?? {};
}

export function setVideo(videoId: string, video: Video) {
  return firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video, { merge: true });
}

export async function isVideoNew(videoId: string) {
  const video = await getVideo(videoId);
  return video?.status === undefined;
}
