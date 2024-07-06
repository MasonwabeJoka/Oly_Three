'use server'
import { connectToDatabase } from "@/lib/mongoose"
import User from "../models/userModels"
import {revalidatePath} from 'next/cache'
import Post from "@/components/forms/Post";
import { AnyNaptrRecord } from "dns";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
     userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
export const updateUser = async ({
    userId,
    username,
    name,
    bio,
    image,
    path

}: Params): Promise<void>=> {
    connectToDatabase()
    
    try {
        await User.findOneAndUpdate(
            {id: userId}, 
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {upsert: true} // Upserting is updating an existing value and if a value doesn't exist inserting a new one.
    
        ) 
    
        if(path === '/profile/edit') {
            revalidatePath(path)
        }

    } catch(error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export const fetchUser = async(userId: string) => {
    try {
        connectToDatabase()

        return await User.findOne({id: userId})
        .populate({
            path: 'groups',
            model: 'Groups'
        })
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export const fetchUserPosts = async (userId: string) => {
    try {
        connectToDatabase()

        //Find all posts authored by user with the given userId.
        const posts = await User.findOne({id: userId})
        .populate({
            path: 'posts',
            model: Post,
            populate: {
                path: 'author',
                model: User,
                select: 'name image id'
            }
        })

        return posts
    } catch (error: any) {
        throw new Error(`Failed to fetch user posts: ${error.message}`)
    }
}

export const fetchUsers = async ({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize =20,
    sortBy='desc',
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string; // sortBy is from mangoose
}) => {
    try {
        connectToDatabase()

        // Implementing pagination functionality

        //SKIPPING
        // Calculate the number of users to skip based on the page number and page size.
        const skipAmount = (pageNumber - 1) * pageSize // - 1 because pages start at zero | pageNumber and pageSize are from params

        // Case insensitive regex for searching the users
        const regex = new RegExp(searchString, 'i') // 'i' means it's insensitive | searchString is from params

        // FETCHING
        const query: FilterQuery<typeof User> = { //FilterQuery is a type from mangoose
            id: {$ne: userId} //$ne means not equal to 
        }

        // SEARCHING
        if(searchString.trim !== '') {
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}},
            ]
        }

        // SORTING
        const sortOptions = { createdAt: sortBy}

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)

        const totalUsersCount = await User.countDocuments(query)


        const users = await usersQuery.exec()

        const isNext = totalUsersCount > skipAmount + users.length

        return { users, isNext}
        
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}
export const getNotifications = async (userId: string) => {
    try {
        connectToDatabase()

        // Find all posts created by the user
        const userPosts = await Post.find({ author: userId })

        // Collect all the replies (children posts) from the children field
        const childPostIds = userPosts.reduce((accumulator: any, userPost: any) => {
            return accumulator.concat(userPost.children)
        }, [])
        
        const replies = await Post.find({
            _id: {$in: childPostIds },
            author: {$ne: userId}, 
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })

        return replies
    } catch (error: any) {
        throw new Error(`Failed to fetch notification: ${error.message}`)
    }
}