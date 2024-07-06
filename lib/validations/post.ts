import * as z from 'zod'

export const PostValidation = z.object({
    postImage: z.string().url().nonempty(),
    postText: z.string().nonempty().min(3, {message: 'Minimum 3 characters'}).max(2000), 
    accountId: z.string(),
})

export const CommentValidation = z.object({
    post: z.string().nonempty().min(3, {message: 'Minimum 3 characters'}).max(2000),   
})