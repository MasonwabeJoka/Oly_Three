import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    image: {type: String, required: true},
    text: {type: String, required: false},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' // This means one post can have multiple posts as children.
        }
    ]
    
})
// For the first time the mongoose model (mongoose.models.Post) won't exist so it will create it based on the post schema (mongoose.models('Post', postSchema))
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post