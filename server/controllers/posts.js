//Creates all of the handlers for our routes. Meaning that we dont want to put our logic all in one file e.g routes/posts

import PostMessage from "../models/postMessage.js"; //gives us access to the postmessage model

export const getPosts = async (req, res) => {
    try {
        //retrieving all the posts that exist in the database. Async function
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        //HTML response 200 that ensures data was fulfilled "Response OK" -> https://www.w3.org/Protocols/HTTP/HTRESP.html
        res.status(200).json(postMessages);
    } catch (error) {
        //Return Not found 
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req, res) => {
    
    //req.body allows you to access data in a string or JSON object from the client side. e.g form
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        //HTML response 201 that ensures data was created successfully "CREATED 201" -> https://www.w3.org/Protocols/HTTP/HTRESP.html
        res.status(201).json(postMessages);
    }catch(error) {
        res.status(409).json({message:error.message});
    }
}