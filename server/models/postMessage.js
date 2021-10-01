//mongoose

import mongoose from 'mongoose';

//creating mongoose schema (a mongoose schema is essentially the way each component is structured (each post has a title, message e.t.c))
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, //handles image

    likeCount: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

//turnig schema to a model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;