import Image from "next/image";
import styles from "./ExternalAd.module.scss";
import VideoAd from "./VideoAd";

type Props = {
  adType: "image" | "video";
  path: string;
};

const ExternalAd = ({ adType, path }: Props) => {

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topBoxOne}></div>
        <div className={styles.topBoxTwo}></div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.adContainer}>
          {adType === "image" && (
            <>
              Ad
              <div className={styles.imageContainer}>
                <Image
                  src={path}
                  alt="above fold ad"
                  width={1300}
                  height={200}
                />
              </div>
            </>
          )}
          {adType === "video" && (
            <>
             Ad
             <VideoAd path={path} />
            </>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomBoxOne}></div>
        <div className={styles.bottomBoxTwo}></div>
      </div>
    </div>
  );
};

export default ExternalAd;
