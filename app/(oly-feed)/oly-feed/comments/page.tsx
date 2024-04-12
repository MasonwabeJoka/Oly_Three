import styles from "./styles.module.scss";
import PostCard from "@/features/oly-feed/components/cards/PostCard";
import { fetchUser } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation'
import { fetchPostsById } from "@/utils/serverActions/postActions";
import CommentForm from "@/features/oly-feed/components/forms/CommentForm";

const Post = async ({ params }: { params: { id: string } }) => {
  if(!params.id) return null;

  const user = await currentUser()
  if(!user) return null;

  const userInfo = await fetchUser(user.id)

  if(!userInfo?.onboardded) redirect('/onboarding')

  // to know which post we are currently on, so we get its comments we use fetchPostById from serverActions.
  const post = await fetchPostsById(params.id)

  return (
    <section>
      <div>
      <PostCard
        key={post._id}
        id={post._id} 
        currentUserId={user?.id || ""}
        parentId={post.parentId}
        image={post.image}
        text={post.text}
        author={post.author}
        groups={post.groups}
        createdAt={post.createAt}
        comments={post.children}
      /> 
      </div>
      <div>
        <CommentForm
          postId={post.id}
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)} // stringify in case the id is not a string
        />
      </div>
      <div>
        {post.children.map((child: any) => (
             <PostCard
             key={child._id}
             id={child._id} 
             currentUserId={user?.id || ""}
             parentId={child.parentId}
             image={child.image}
             text={child.text}
             author={child.author}
             groups={child.groups}
             createdAt={child.createAt}
             comments={child.children}
             isComment={true}
           /> 
        ))}
      </div>
    </section>
  );
};

export default Post;
