import styles from "./VideoUploadCard.module.scss";
import ToggleButton from "../ToggleButton";
import VideoPlayer from "../VideoPlayer";
import { useBreakpoint } from "@/store/useBreakpointStore";

interface Props {
  videoPath: string;
  index: number;
}

//Todo: Add edit and delete buttons
const VideoUploadCard = ({ videoPath, index }: Props) => {
  const { isSmallDesktop } = useBreakpoint();
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        {videoPath && <VideoPlayer videoPath={videoPath} />}
      </div>

      <div className={styles.text}>
        <div className={styles.titleContainer}>

        <div className={styles.title}>
          Lorem ipsum odor amet, consectetuer adipiscing elit.
        </div>
        {
          isSmallDesktop && (
            <div className={styles.publishButton}>
              <ToggleButton
                id={`publishButton-${index}`}
                name={`publishButton-${index}`}
              />
            </div>
          )
        }
        </div>
        <p className={styles.description}>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Amet placerat
          egestas nibh pellentesque nec eu sapien.
        </p>
      </div>
      {!isSmallDesktop && (
        <div className={styles.publishButtonContainer}>
          <div className={styles.publishButton}>
            <ToggleButton
              id={`publishButton-${index}`}
              name={`publishButton-${index}`}
            />
          </div>
          <span className={styles.publishButtonText}>Publish</span>
        </div>
      )}
    </div>
  );
};

export default VideoUploadCard;
