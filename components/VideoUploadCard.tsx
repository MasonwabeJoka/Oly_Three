import ToggleButton from "./ToggleButton";
import VideoPlayer from "./VideoPlayer";

import styles from "./VideoUploadCard.module.scss";

interface Props {
  videoPath: string;
}
const VideoUploadCard = ({ videoPath }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        {videoPath && <VideoPlayer videoPath={videoPath} />}
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>
          Lorem ipsum odor amet, consectetuer adipiscing elit.
        </h1>
        <p className={styles.description}>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Amet placerat
          egestas nibh pellentesque nec eu sapien.
        </p>
      </div>
      <div className={styles.publishButtonContainer}>
        <div className={styles.publishButton}>
          <ToggleButton id="publishButton" name="publishButton" />
        </div>
        <span className={styles.publishButtonText}>Publish</span>
      </div>
    </div>
  );
};

export default VideoUploadCard;
