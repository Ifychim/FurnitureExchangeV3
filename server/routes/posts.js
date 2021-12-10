//Routes that have to do with posts e.g cards. Will be handled with express.js

import express from 'express';
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

//middle-ware
import auth from '../middleware/auth.js';

//updatePost
//setting up our router
const router = express.Router();

//callback function for when someone visits localhost:5000/posts
//Defines what routes are used with router

router.get('/search', getPostsBySearch);

router.get('/', getPosts);

router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);

//delete route for deleting posts
router.delete('/:id', auth, deletePost);

//patch request for liking posts
router.patch('/:id/likePost', auth, likePost);

//route for getting a single post
router.get('/:id', getPost);
export default router;
