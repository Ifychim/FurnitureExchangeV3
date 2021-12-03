//Creates all of the handlers for our routes. Meaning that we dont want to put our logic all in one file e.g routes/posts

import mongoose  from 'mongoose';
import express, { Router } from "express";

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

//params and query mean different things
//query => /posts?page=1 => means query where page=1
//params => /posts/123 => id = 123 => get a specific resource
export const getPostsBySearch = async (req,res) => {

    const {searchQuery, tags} = req.query;

    try{
        const title = new RegExp(searchQuery, 'i'); //i stands for ignore case in Regex

        //find all the posts that match one of the two criteria. 1- title, is ttile tha sme as frontend. Is one of tags in array of tags equal to the tags in frontend.
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        //const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        
        req.json({data:posts});

    }catch (error){
       
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req,res) => {
    //req.body allows you to access data in a string or JSON object from the client side. e.g form
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        //HTML response 201 that ensures data was created successfully "CREATED 201" -> https://www.w3.org/Protocols/HTTP/HTRESP.html
        //res.status(201).json(postMessages);
        res.status(201).json(newPost);
        console.log("Post Created");
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
    console.log("Post Updated");

}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No posts with that id");
    }

    console.log("Post Deleted");
    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});
};

export const likePost = async(req, res) => {
    const {id} = req.params;
    //checking if user is authenticated
    if(!req.userId){
        return res.json({message: "Unauthenticated"});
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No posts with that id");
    }

    const post = await PostMessage.findById(id);

    
    const index = post.likes.findIndex((id) => id === String(req.userId));
    
    if(index === -1){
        //if user wants to like post
        post.likes.push(req.userId);
    }else{
        //dislike
        post.likes.filter((id)=> id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
   
    res.status(200).json(updatedPost);

}

