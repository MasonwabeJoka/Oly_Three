import styles from "./styles.module.scss";
import UserCard from "@/features/oly-feed/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users
  const usersResult = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <div>
        {usersResult.users.length === 0 ? (
          <p>No users</p>
        ) : (
          <>
            {usersResult.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                image={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
