"use server"
// Mock database connection for now
const connectToDatabase = async () => {};

// Mock models
const User: any = {
	findByIdAndUpdate: async () => ({}),
};

const Post: any = {
	create: async () => ({ _id: "mock-id" }),
	find: () => ({
		sort: () => ({
			skip: () => ({
				limit: () => ({
					populate: () => ({
						populate: () => ({
							exec: async () => [],
						}),
					}),
				}),
			}),
		}),
	}),
	countDocuments: async () => 0,
	findById: () => ({
		populate: () => ({
			populate: () => ({
				exec: async () => null,
			}),
		}),
	}),
};
import { revalidatePath } from "next/cache";


interface Params {
    image: string;
    text: string;
    author: string;
    groupId: string| null;
    path: string;
}

export const createPost = async ({
    image,
    text, 
    author,
    groupId,
    path
}: Params) => { 
    try {
        connectToDatabase()

        const createdPost = await Post.create({
            image,
            text,
            author,
            group: null,
          
        })
    
        //Update user model
        await User.findByIdAndUpdate(author, {
            $push: {posts: createdPost._id}
        })
    
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error creating post: ${error.message}`)
    }
   

}

export const fetchPosts = async (pageNumber = 1, pageSize = 20)=> { 
    try {
        connectToDatabase()
        // For pagination we have to know where we are. We calculate number of posts to skip
        const skipAmount = (pageNumber - 1) * pageSize //pageNumber - 1 because posts will first be shown on first page.
        // Fetch the main/top-level posts (posts with no parents/ posts that are not comments)
        const postQuery = Post.find({parentId: {$in: [null, undefined]}}) // parentId is null or undefined
        .sort({createdAt: 'desc'}) // newest posts at the top
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children', // to ensure we get comments
            populate: { // we don't want every thing from the children so we will specify what we want
                path: 'author',
                model: User,
                select: "_id name parentId image" // select which fields do we need from author
            }
        }) 

        const totalPostsCount = await Post.countDocuments({parentId: {$in: [null, undefined]}})

        const posts = await postQuery.exec()

        // check if we have a next page
        const isNext = totalPostsCount > skipAmount + posts.length

        return { posts, isNext }
    } catch (error: any) {
        throw new Error(`Error creating post: ${error.message}`)
    }
   

}

export const fetchPostsById = async (id: string) => {
    connectToDatabase()

    try {
        const post = await Post.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: '_id id name image' // select which fields do we need from author
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id id name parentId image', 
                },
                {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image',  
                    },
                    
                },
            ],
           
        }).exec()
        
        return post
    } catch (error: any) {
        throw new Error(`Error fetching post: ${error.message}`)
    }
}

export const addCommentToPost = async (
    postId: string,
    commentImage: string,
    commentText: string,
    userId: string,
    path: string,
) => {
    connectToDatabase()

    try {
        //Find the original post by its id.
        const originalPost = await Post.findById(postId)

        if(!originalPost)  {
            throw new Error('Post not found')
        }

        // Create a new post
        const commentPost = new Post({
            image: commentImage,
            text: commentText,
            author: userId,
            parentId: postId,
        })

        // Save new post to database
        const savedCommentPost = await commentPost.save()

        // Update the original post to include the new comment
        originalPost.children.push(savedCommentPost._id)

        // Save the original post
        await originalPost.save()

        revalidatePath(path)
    } catch( error: any) {
        throw new Error(`Error adding comment to post: ${error.message}`)
    }
}