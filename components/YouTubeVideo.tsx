"use client";
import styles from "./YouTubeVideo.module.scss";
import YouTube, { YouTubeProps } from "react-youtube";

const YouTubeAny: any = YouTube;

interface YouTubeVideoProps {
  videoId: string;
  width: string;
  height: string;
  playerVars: object;
}

const YouTubeVideo = ({
  videoId,
  width,
  height,
  playerVars,
}: YouTubeVideoProps) => {
  const opts = {
    height,
    width,
    playerVars,
  };

  return <YouTubeAny videoId={videoId} opts={opts} />;
};

export default YouTubeVideo;
