import * as z from 'zod'

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(2, {message: 'Minimum 2 characters'}).max(30, {message: 'Maximum 30 characters'}),
    username: z.string().min(2, {message: 'Minimum 2 characters'}).max(30, {message: 'Maximum 30 characters'}),
    bio: z.string().min(8, {message: 'Minimum 8 characters'}).max(1000, {message: 'Maximum 1000 characters'}),
})