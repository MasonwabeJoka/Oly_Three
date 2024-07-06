import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Contact from "@/features/messages/components/Contact";
import Link from "next/link";
import { User } from "@/sanity/Types/User";
import { users } from "@/app/temp/tempForMessages";
import { currentUser } from "@/app/temp/tempForMessages";

const Contacts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Input
          className={styles.search}
          inputType="text"
          inputColourType="normal"
          inputSize="medium"
          iconSrcLeft=""
          iconSrcRight="/icons/search.png"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="search-bar"
          placeholder=""
          id="search-bar"
          name="search-bar"
          ariaLabel="Search"
          autoFocus={false}
          required={false}
        />
      </div>
      <div className={styles.contacts}>
        {users.map((user) => (
          <div key={user.id} className={styles.contact}>
            <Contact
              name={user.name}
              avatar={user.image}
              avatarSize="regular"
              isOnline
              user={user}
            />
          </div>
        ))}
      </div>
      <Link href="/dashboard/messages">
        <h4 className={styles.backToChatLink}>Back to chat</h4>
      </Link>
    </div>
  );
};

export default Contacts;
