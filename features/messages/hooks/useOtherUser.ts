// // import session from Sanity

// import { useMemo } from "react";
// import { FullChatType } from "../lib/types";
// import {User} from '@prisma/client'

// const useOtherUser = (chat: FullChatType | {users: User[]}) => {
//     // const session = useSesstion()

//     const useOtherUser= useMemo(()=> {
//         // get the current user email
//         const currentUserEmail = session?.data?.user?.email

//         // filter out current user email from the rest of the emails
//         const otherUser = chat?.users.filter((user) => user.email === currentUserEmail)

//         return  otherUser[0]

//     }, [session.data?.user?.email, chat.users])

//     return useOtherUser
// }


// export default useOtherUser