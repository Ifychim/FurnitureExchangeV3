//mongoose

import mongoose from 'mongoose';

//creating mongoose schema (a mongoose schema is essentially the way each component is structured (each post has a title, message e.t.c))
//POTENTIAL BUG IN POST SCHEMA MODEL
const postSchema = mongoose.Schema({
    
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, //handles image
    
    likes: {
        type: [String],
        default: [],
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

//turning schema to a model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;