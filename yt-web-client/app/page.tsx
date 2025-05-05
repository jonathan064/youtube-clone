import styles from "./page.module.css";
import { getVideos } from "./firebase/functions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const videos = await getVideos();

  return (
    <main>
      <div className={styles.wrapper}>
        {videos.map((video) => (
          <div key={video.id} className={styles.item}>
            <Link href={`/watch?v=${video.filename}`}>
              <Image
                src={"/thumbnail.png"}
                alt="video"
                width={400}
                height={230}
                style={{ borderRadius: 8 }}
              ></Image>
            </Link>
            <h1>{video.date}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
