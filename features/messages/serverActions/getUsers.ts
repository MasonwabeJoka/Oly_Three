import prisma from "@/lib/prismadb";
import  getSession  from "./getSession";

const getUsers = async () => {
    // const session = await getSession()

    // if(!session?.user?.email) { 
    //     return []
    // }

    try {
        // const users = await prisma.user.findMany({
        //     orderBy: {
        //         createdAt: 'desc',
        //     },
        //     // We are finding all the users users without our email. Or other users not us.
        //     where: {
        //         NOT: {
        //             email: session.user.email
        //         }
        //     }
        // })
        return users
    } catch (error: any) {
        return []
    }
}

export default getUsers