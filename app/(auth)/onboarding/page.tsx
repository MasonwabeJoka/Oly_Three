import styles from "./styles.module.scss";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Onboarding: React.FC = async () => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(userInfo?.onboarded) redirect('/')

    const userData = {
      id: user?.id,
      objectId: userInfo?._id,
      userName: userInfo ? userInfo?.username : user?.username,
      name: userInfo ? userInfo?.name : user?.firstName,
      bio: userInfo ? userInfo?.bio : "",
      image: userInfo ? userInfo?.image : user?.imageUrl,
    };

  return (
    <main>
      <h1>Onboarding</h1>
      <p>Complete Your Profile Now</p>
      <section>
        <AccountProfile user={userData} buttonChildren="Continue" />
        <AccountProfile
          user={{
            id: "",
            objectId: "",
            username: "",
            name: "",
            bio: "",
            image: "/profilePic.jpg",
          }}
          buttonChildren="Continue"
        />
      </section>
    </main>
  );
};

export default Onboarding;
