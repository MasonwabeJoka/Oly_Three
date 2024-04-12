'use client'
import { useRouter } from 'next/navigation';
import styles from './Contact.module.scss'
import { useCallback, useState } from 'react';
import Avatar from '@/components/Avatars';
import axios from 'axios';

type ContactProps = {
    avatar: string | null;
    avatarSize: "small" | "regular" | "large";
    name: string;
    isOnline: boolean;
    user: User;
  };
  
  const Contact: React.FC<ContactProps> = ({
    avatar,
    avatarSize,
    name,
    isOnline,
    user,
  }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClicked = useCallback(() => {
      setIsLoading(true);
      // we are making a post request to the conversations route.
      // we are sending the user id of the contact we are starting the conversation with.
      // when we click on the contact are sending the id of that contact.
      axios.post('/api/conversations',{
        userId: user.id
      })
      .then((data)=> {
        router.push(`/conversations/${data.user.id}`)
      })
      .finally(()=> setIsLoading(false))
    }, [user, router])
    
  
    return (
      <div className={styles.contact}>
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            avatar={avatar}
            avatarSize={avatarSize}
          />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.name}>
            {" "}
            {user?.name?.length > 19 ? user?.name.slice(0, 20) + "..." : user?.name || name.length > 19 ? name.slice(0, 20) + "..." : name}

          </p>
          
        </div>

      </div>
    );
  };
  
  export default Contact;