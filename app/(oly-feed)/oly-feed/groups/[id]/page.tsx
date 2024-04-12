import styles from "./styles.module.scss";

import styles from "./styles.module.scss";
import Post from "@/components/forms/Post";
import { fetchUser } from "@/utils/serverActions/userActions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from '@/features/oly-feed/layouts/OlyFeedProfileHeader'
import {profileTabs} from '@/features/oly-feed/data/OFTabsData'
import Button from '@/components/Buttons'
import Icon from '@/components/Icon'

const Group = async ({params}: {params: {id: string}}) => {
    const user = await currentUser()

    if(!user) return null
  
    const userInfo = await fetchUser(params.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    
    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                image= {userInfo.image}
                bio={userInfo.bio}
            />
            <div className={styles.tabsContainer}>
                <div className={styles.tab}>
                  {profileTabs.map(tab => {
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
                        
                            {tab.label === 'Posts' && (<span>{userInfo?.posts?.length}</span>)}
                        </div>
                        <div className={styles.label}></div>
                        <div className={styles.count}></div>   
                    </div>
                  )
                  })}
                </div>
                {profileTabs.map(tab => {
                    return (
                        <div className={styles.tabsContent} key={`content-${tab.label}`}>
                            passing the info in PostsTab will help us tell if the user is in their own profile
                            <PostsTab 
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Group