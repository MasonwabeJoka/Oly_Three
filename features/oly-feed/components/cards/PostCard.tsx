import styles from "./PostCard.module.scss";
import Image from "@/components/Image";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import Icon from "@/components/Icon";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  image: string;
  text: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  groups: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const PostCard = ({
  id,
  currentUserId,
  parentId,
  image,
  text,
  author,
  groups,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article className={styles.container}>
      <Link
        href={`/oly-feed/profile/${author.id}`}
        className={styles.authorAvatar}
      >
        <Avatar
          className={styles.avatar}
          avatar={author.image}
          imageAlt="Profile Picture"
          avatarSize="regular"
          priority
        />
        <div className={styles.postBar}></div>
      </Link>
      <Link
        href={`/oly-feed/profile/${author.id}`}
        className={styles.authorName}
      >
        <h4>{author.name}</h4>
      </Link>
      <div className={styles.image}>
        <Image src={image} alt="Post Image" width={400} height={400} />
      </div>
      <h2>{text}</h2>
      <div className={styles.icons}>
        <Icon
          className={styles.heartIcon}
          src="/icon.png"
          alt="Heart Icon"
          width={24}
          height={24}
        />
        <Link href={`/oly-feed/post/${id}`}>
          <Icon
            className={styles.replyIcon}
            src="/icon.png"
            alt="Reply Icon"
            width={24}
            height={24}
          />
        </Link>
        <Icon
          className={styles.repostIcon}
          src="/icon.png"
          alt="Repost Icon"
          width={24}
          height={24}
        />
        <Icon
          className={styles.shareIcon}
          src="/icon.png"
          alt="Share Icon"
          width={24}
          height={24}
        />
      </div>
      {isComment && comments.length > 0 && (
        <Link href={`/oly-feed/post/${id}`}>
          <p className={styles.commentsCount}>{comments.length} replies</p>
        </Link>
      )}
    </article>
  );
};

export default PostCard;
