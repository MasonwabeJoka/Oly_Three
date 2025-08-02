import {
  fetchUserPosts,
  fetchGroupPosts,
} from "@/utils/serverActions/userActions";
import styles from "./PostsTab.module.scss";
import { redirect } from "next/navigation";
import PostCard from "./cards/PostCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const PostsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let postsResults: any;

  if (accountType === "Group") {
    postsResults = await fetchGroupPosts(accountId);
  } else {
    await fetchUserPosts(accountId);
  }

  if (!postsResults) redirect("/");
  return (
    <ul>
      {postsResults.posts.map((post: any) => {
        return (
          <li className={styles.post} key={post._id}>
            <PostCard
              id={post._id}
              currentUserId={currentUserId}
              parentId={post.parentId}
              image={post.image}
              text={post.text}
              author={
                accountType === "User"
                  ? {
                      name: postsResults.name,
                      image: postsResults.image,
                      id: postsResults.id,
                    }
                  : { name: post.name, image: post.image, id: post.id }
              }
              groups={post.groups}
              createdAt={post.createAt}
              comments={post.children}
              isComment={true}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsTab;
