import styles from "./styles.module.scss";
import { currentUser } from "@clerk/nextjs";
import Icon from '@/components/Icon'
import {groupTabs} from '@/features/oly-feed/data/OFTabsData'
import ProfileHeader from '@/features/oly-feed/layouts/OlyFeedProfileHeader'
import Button from '@/components/Buttons'
import UserCard from "@/features/oly-feed/components/cards/UserCard";

const Profile = async ({params}: {params: {id: string}}) => {
    const user = await currentUser()

    if(!user) return null
  
    const groupDetails = await getchGroupDetails(params.id)
    
    return (
        <section>
            <ProfileHeader
                accountId={groupDetails.id}
                authUserId={user.id}
                name={groupDetails.name}
                username={groupDetails.username}
                image= {groupDetails.image}
                bio={groupDetails.bio}
                type= 'Group'
            />
            <div className={styles.tabsContainer}>
                <div className={styles.tab}>
                  {groupTabs.map(tab => {
                    return (
                    <div className={styles.tabsTrigger} key={tab.label}>
                        <div className={styles.icon}>
                            <Icon
                              className="icon"
                              src={tab.icon}
                              alt={tab.label}
                              width={24}
                              height={24}
                            />
                            <p>{tab.label}</p>
                        
                            {tab.label === 'Posts' && (<span>{groupDetails?.posts?.length}</span>)}
                        </div>
                        <div className={styles.label}></div>
                        <div className={styles.count}></div>   
                    </div>
                  )
                  })}
                </div>
               
                <div className={styles.tabsContent}>
                    <PostsTab 
                        currentUserId={user.id}
                        accountId={groupDetails._id}
                        accountType="Group"
                    />
                   <section>
                    {groupDetails?.members.map((member: any) =>(
                        <UserCard
                            key={member._id}
                            id={member._id}
                            name={member.name}
                            username={member.username}
                            image={member.image}
                            personType="User"
                        />
                    ))}
                   </section>
                    <PostsTab 
                        currentUserId={user.id}
                        accountId={groupDetails._id}
                        accountType="Group"
                    />
                </div>
            
            </div>
        </section>
    )
}

export default Profile