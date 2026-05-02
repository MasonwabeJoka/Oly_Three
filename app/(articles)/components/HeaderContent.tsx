"use client";
import Avatar from "@/components/Avatar";
import styles from "./HeaderContent.module.scss";
import Image from "@/components/Image";
import useBreakpointStore from "@/store/useBreakpointStore";

type Props = {
  layout: "textLeft" | "textRight";
  path: string;
  image: string;
  title: string;
  description: string;
};

const HeaderContent = ({ layout, path, image, title, description }: Props) => {
  const { isMobile, isTablet } = useBreakpointStore();
  return (
    <>
      {layout === "textLeft" && !isMobile && !isTablet && (
        <TextLeft
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
        />
      )}

      {layout === "textRight" && !isMobile && !isTablet && (
        <TextRight
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
        />
      )}
      {isTablet && layout === "textLeft" && (
        <TextLeftTablet
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
        />
      )}
      {isTablet && layout === "textRight" && (
        <TextRightTablet
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
        />
      )}
    </>
  );
};

export default HeaderContent;

export const TextLeft = ({ image, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.textContent}>
          {/* <h2 className={styles.title}>{title}</h2> */}
          <h2 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.articleAuthor}>
            <div className={styles.authorAvatar}>
              <Avatar avatar="/profilePic.jpg" avatarSize="small" />
            </div>
            <div className={styles.authorName}>
              <p>John Doe</p>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt="Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "2.5rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export const TextRight = ({ image, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt="Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "2.5rem" }}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.articleAuthor}>
            <div className={styles.authorAvatar}>
              <Avatar avatar="/profilePic.jpg" avatarSize="small" />
            </div>
            <div className={styles.authorName}>
              <p>John Doe</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export const TextLeftTablet = ({ image, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.articleAuthor}>
            <div className={styles.authorAvatar}>
              <Avatar avatar="/profilePic.jpg" avatarSize="small" />
            </div>
            <div className={styles.authorName}>
              <p>John Doe</p>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt="Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "2.5rem" }}
          />
        </div>
      </div>
    </div>
  );
};
export const TextRightTablet = ({ image, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt="Illustration"
            fill
            className={styles.image}
            style={{ objectFit: "cover", borderRadius: "3rem" }}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.articleAuthor}>
            <div className={styles.authorAvatar}>
              <Avatar avatar="/profilePic.jpg" avatarSize="small" />
            </div>
            <div className={styles.authorName}>
              <p>John Doe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
