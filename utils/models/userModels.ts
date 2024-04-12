import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' // this means one use can have references to multiple posts
        }
    ],
    onboarded: { // is the user on-boarded?
        type: Boolean,
        default: false,

    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    ]
})
// For the first time the mongoose model (mongoose.models.User) won't exist so it will create it based on the user schema (mongoose.models('User', userSchema))
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User