//Creates all of the handlers for our routes. Meaning that we dont want to put our logic all in one file e.g routes/posts

import mongoose  from 'mongoose';
import PostMessage from "../models/postMessage.js"; //gives us access to the postmessage model

export const getPosts = async (req, res) => {
    try {
        //retrieving all the posts that exist in the database. Async function
        const postMessages = await PostMessage.find();

       // console.log(postMessages);

        //HTML response 200 that ensures data was fulfilled "Response OK" -> https://www.w3.org/Protocols/HTTP/HTRESP.html
        res.status(200).json(postMessages);
    } catch (error) {
        //Return Not found 
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) => {
    //req.body allows you to access data in a string or JSON object from the client side. e.g form
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        //HTML response 201 that ensures data was created successfully "CREATED 201" -> https://www.w3.org/Protocols/HTTP/HTRESP.html
        //res.status(201).json(postMessages);
        res.status(201).json(newPost);
    }catch(error) {
        res.status(409).json({message:error.message});
    }
}



export const updatePost = async(req, res) =>{
    
    //extracting id from request params using object destructuring
    const{  id: _id } = req.params;
    const post = req.body;

    //check to see if id is a mongoose object id
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No posts with that id");
    }

    //Updating post via id through Model Created with mongooose. Async action.
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});

    res.json(updatedPost);

}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No posts with that id");
    }

    console.log("DELETE!");
    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});
};

export const likePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No posts with that id");
    }

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);

}