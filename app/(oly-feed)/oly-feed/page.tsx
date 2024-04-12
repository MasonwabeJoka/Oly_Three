import styles from "./styles.module.scss";
import {fetchPosts} from '@/utils/serverActions/postActions'
import { currentUser } from '@clerk/nextjs'
import PostCard from '@/features/oly-feed/components/cards/PostCard'

const OlyFeed =async  () => {
  const postResults = await fetchPosts(1, 30)
  const user = await currentUser()
  return (
    <div className={styles.container}>
      <h1>OlyFeed</h1>

      <section>
        {postResults?.posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <>
            {postResults.posts.map(post  => (
              <PostCard
                key={post._id}
                id={post._id}
                currentUserId = {user?.id || ''}
                parentId= {post.parentId}
                image = {post.image}
                text={post.text}
                author={post.author}
                groups= {post.groups}
                createdAt= {post.createAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default OlyFeed;
