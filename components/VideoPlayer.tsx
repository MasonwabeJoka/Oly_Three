import { useState } from "react";
import MediaThemeNotflix from "player.style/notflix/react";

interface Props {
  videoPath: string;
}

export default function VideoPlayer({ videoPath }: Props) {
  const [maxWidth, setMaxWidth] = useState("360px");

  if (!videoPath || videoPath.trim() === "") return null;

  return (
    <MediaThemeNotflix
      style={{
        "--media-primary-color": "#ccf6ff",
        "--media-secondary-color": "#14d6ff",
        "--media-accent-color": "#14d6ff",
        borderRadius: "2.5rem",
        maxWidth,
        width: "100%",
      } as React.CSSProperties}
    >
      <video
        slot="media"
        src={videoPath}
        playsInline
        crossOrigin=""
        style={{ minWidth: "320px", minHeight: "180px" }}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          setMaxWidth(v.videoWidth > v.videoHeight ? "740px" : "360px");
        }}
      />
    </MediaThemeNotflix>
  );
}
