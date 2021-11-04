//Routes that have to do with posts e.g cards. Will be handled with express.js

import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
//updatePost
//setting up our router

//middle ware
import auth from '../middleware/auth.js';
const router = express.Router();


router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);

//delete route for deleting posts
router.delete('/:id', auth, deletePost);

//patch request for liking posts, auth to make sure user can only like a post once for a specific id.
router.patch('/:id/likePost', auth, likePost);

export default router;
