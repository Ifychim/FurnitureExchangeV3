//Routes that have to do with posts e.g cards. Will be handled with express.js

import express from 'express';
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

//middle-ware
import auth from '../middleware/auth.js';

//updatePost
//setting up our router
const router = express.Router();

//callback function for when someone visits localhost:5000/posts
//Defines what routes are used with router

router.get('/search', getPostsBySearch);

router.get('/', getPosts);



//router.post('/', auth , createPost);
router.post('/', auth, createPost);

//router.patch('/:id', auth, updatePost);
router.patch('/:id', auth, updatePost);

//delete route for deleting posts
//router.delete('/:id', auth, deletePost);
router.delete('/:id', auth, deletePost);

//patch request for liking posts
//router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
