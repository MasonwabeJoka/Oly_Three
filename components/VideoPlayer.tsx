import MediaThemeNotflix from "player.style/notflix/react";
interface Props {
  videoPath: string;
}
export default function VideoPlayer({ videoPath }: Props) {
  return (
    <>
      <MediaThemeNotflix
        style={{
          "--media-primary-color": "#ccf6ff",
          "--media-secondary-color": "#14d6ff",
          "--media-accent-color": "#14d6ff",
          borderRadius: "2.5rem",
        }}
      >
        <video
          slot="media"
          src={videoPath}
          playsInline
          crossOrigin=""
          style={{
            borderRadius: "2.5rem",
            maxWidth: "640px",
            maxHeight: "640px",
          }}
        ></video>
      </MediaThemeNotflix>
    </>
  );
}
