import React from "react";
import styles from "./styles.module.scss";

import GroupCard from "@/features/oly-feed/components/cards/GroupCard";
import { fetchUser, fetchGroups } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Groups: React.FC = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch groups
  const groupsResult = await fetchGroups({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <div>
        {groupsResult.groups.length === 0 ? (
          <p>No groups</p>
        ) : (
          <>
            {groupsResult.groups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                username={group.username}
                image={group.image}
                bio={group.bio}
                members={group.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Groups;