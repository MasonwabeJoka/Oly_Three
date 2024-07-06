import styles from "./Blog.module.scss";
import Articles from "@/components/Articles";
import useArticlesStore from "@/store/articlesStore";
import Button from "@/components/Buttons";
import useTitleStore from "@/store/titleStore";

const Blog = () => {
  const title: string[] = useArticlesStore((state) => state.title);
  const setTitle = useArticlesStore((state) => state.setTitle);
  const description: string = useArticlesStore((state) => state.description);
  const author: string = useArticlesStore((state) => state.author) || "";
  const images: string[] = useArticlesStore((state) => state.images);
  const getImages = useArticlesStore((state) => state.getImages);
  const avatars: string[] = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const price: string = useArticlesStore((state) => state.price);
  const data: any = useArticlesStore((state) => state.data);
  const setData = useArticlesStore((state) => state.setData);
  const Title = useTitleStore((state) => state.Title);

  return (
    <div className={styles.blogSection}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Blog</Title>
      </div>

      <Articles
        images={images.length ? images : data[0].images}
        avatars={avatars.length ? avatars : [""]}
        author={author}
        title={title}
        description={description}
        price={price}
        data={data}
      />
      <div className={styles.buttons}>
        <Button
          className={styles.moreArticlesBtn}
          buttonType="normal"
          buttonChildren="More articles..."
          buttonSize="large"
          type="button"
          name="More Articles Button"
          ariaLabel="More Articles Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          className={styles.forumBtn}
          buttonType="normal"
          buttonChildren="Forum"
          buttonSize="large"
          type="button"
          name="Forum Button"
          ariaLabel="Forum Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default Blog;
