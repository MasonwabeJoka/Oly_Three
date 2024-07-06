import styles from "./styles.module.scss";
import Post from "@/components/forms/Post";
import { fetchUser } from "@/utils/serverActions/userActions";
import { CurrentUser, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreatePost: React.FC = async () => {
  const user = await currentUser()

  if(!user) return null

  const userInfo = await fetchUser(user.id)

  if(!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className={styles.title}>Post Your Ad</h1>
      <Post userId={userInfo._id}/>
      <Post />
    </>
  );
};

export default CreatePost;
