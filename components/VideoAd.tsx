"use client";
import styles from "./VideoAd.module.scss";
import YouTubeVideo from "@/components/YouTubeVideo";
import useIsMobileStore from "@/store/useMobileStore";

type Props = {
  path: string;
}

const VideoAd = ({path}: Props) => {
  const isMobile = useIsMobileStore((state) => state.isMobile);

  return (
    <div className={styles.videoAdContainer}>
      <div className={styles.video}>
        {isMobile ? (
           <YouTubeVideo
           videoId="J468yZ0plhA"
           width="311"
           height="175"
           playerVars={{
             path,
             autoPlay: 1,
             loop: 1,
             controls: 1,
             showInfo: 0,
             modestBranding: 0,
             rel: 0,
           }}
         />
        ): (
          <YouTubeVideo
          videoId="J468yZ0plhA"
          width="628"
          height="353.25"
          playerVars={{
            path,
            autoPlay: 1,
            loop: 1,
            controls: 1,
            showInfo: 0,
            modestBranding: 0,
            rel: 0,
          }}
        />
        )}
       
      </div>
    </div>
  );
};

export default VideoAd;
