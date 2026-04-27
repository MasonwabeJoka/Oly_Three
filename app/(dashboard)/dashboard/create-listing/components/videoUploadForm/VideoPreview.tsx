import styles from './VideoPreview.module.scss'
import VideoPlayer from "@/components/VideoPlayer";

interface Props {
  videoPath: string;

}

const VideoPreview = ({ videoPath
 }: Props) => (
  <div className={styles.video}>
    <VideoPlayer videoPath={videoPath} />
  </div>
);

export default VideoPreview;
