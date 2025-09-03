import Icon from "@/components/Icon";
import styles from "./PostMetrics.module.scss";
import { Suspense, useState } from "react";

type Props = {
  totalViews: number;
};

const PostMetrics = ({ totalViews }: Props) => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const getImageSrc = () => {
    if (isHeartClicked) return "/icons/heart-clicked.svg";
    if (isHeartHovered) return "/icons/heart-hover.svg";
    return "/icons/heart.svg";
  };
  return (
    <>
      <div className={styles.postMetrics}>
        <div className={styles.likes}>
          <div className={styles.icon}>
            <Icon
              className={styles.likesIcon}
              src={"/icons/heart-clicked.svg"}
              alt="likes icon"
              width={20}
              height={20}
            />
          </div>
          <p>10</p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.views}>
            <div className={styles.icon}>
              <Icon
                className={styles.viewsIcon}
                src={getImageSrc()}
                alt="views icon"
                width={20}
                height={20}
              />
            </div>
            <p>{totalViews || 0} </p>
          </div>
        </Suspense>
        <div className={styles.postAge}>
          <p>
            Posted <span className={styles.duration}>2 weeks</span> ago
          </p>
        </div>
      </div>
    </>
  );
};

export default PostMetrics;
