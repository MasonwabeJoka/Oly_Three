import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Contact from "@/features/messages/components/Contact";
import Link from "next/link";
import { User } from "@/sanityTemp/Types/User";
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
          required={true}
        />
      </div>
      <ul className={styles.contacts}>
        {users.map((user) => (
          <li key={user.id} className={styles.contact}>
            <Contact
              name={user.name}
              avatar={user.image}
              avatarSize="regular"
              isOnline
              user={user}
            />
          </li>
        ))}
      </ul>
      <Link href="/dashboard/messages">
        <h4 className={styles.backToChatLink}>Back to chat</h4>
      </Link>
    </div>
  );
};

export default Contacts;
