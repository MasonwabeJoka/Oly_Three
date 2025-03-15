import Image from "next/image";
import styles from "./Article.module.scss";
import HomeButton from "./HomeButton";
import { socialMediaData } from "@/data/socialMediaData";
import Icon from "./Icon";
const Article = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/listing_images/landscape/3.jpg"
          fill
          alt="Image"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "32px",
          }}
        />
        <nav className={styles.homeButton}>
          <HomeButton />
        </nav>
        <div className={styles.shareArticle}>
          <div className={styles.copyArticle}>
            <div className={styles.icon}>
              <Icon
                className=""
                src="/icons/copy.png"
                alt="Copy Icon"
                width={12}
                height={12}
              />
            Share
            </div>
          </div>
          <div className={styles.socialMediaLinks}>
            {socialMediaData.slice(0, 5).map((socialMedia, index) => (
              <div key={index} className={styles.icon}>
                <Icon
                  className=""
                  src={socialMedia.icon}
                  alt={`${socialMedia.name} Icon`}
                  width={12}
                  height={12}
                />
              </div>
            ))}
          </div>
        </div>
      </header>
      <section className={styles.topBar}></section>
      <section className={styles.wrapper}>
        <aside className={styles.leftSideBar}></aside>
        <main className={styles.main}></main>
        <aside className={styles.rightSideBar}></aside>
      </section>
    </section>
  );
};

export default Article;
