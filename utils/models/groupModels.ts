import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' // this means one use can have references to multiple posts
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]
})
// For the first time the mongoose model (mongoose.models.Group) won't exist so it will create it based on the group schema (mongoose.models('Group', groupSchema))
const Group = mongoose.models.Group || mongoose.models('Group', groupSchema);

export default Group