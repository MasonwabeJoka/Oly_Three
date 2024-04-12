import prisma from "@/lib/prismadb";

// import getSession from "./getSession"

const getCurrentUser = async () => {
    const currentUser = {
        id: "1",
        name: "John Doe",
        email: "pYqJZ@example.com",
        emailVerified: new Date(),
        image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fFBST0ZJTEUlMjBJTUFHRXxlbnwwfHwwfHx8MA%3D%3D", // URL to a user's profile image or null if no image
        hashedPassword: "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b7e8e4e8c1dacfec8", // Hashed password or null if not set
        createdAt: new Date('2024-02-20T12:00:00Z'), // Creation date of the user account
        updatedAt: new Date('2024-02-20T12:00:00Z'), // Last update date of the user account
        conversationIds: ["conv123", "conv456", "conv789"], // Array of conversation IDs associated with the user
        seenMessagesIds: []
    }
    try {
        // const session = await getSession()

        // if(!session?.user.email) {
        //     return null
        // }

        // const currentUser = await prisma.user.findUnique({
        //     where: {
        //         email: session.user.email as string
        //     }
        // })

    if(!currentUser) {
        null
    }

    return currentUser;

    } catch (error: any) {
        return null
    }
}

export default getCurrentUser