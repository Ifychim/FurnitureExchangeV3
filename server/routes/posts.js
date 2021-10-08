//Routes that have to do with posts e.g cards. Will be handled with express.js

import express from 'express';
import { getPosts, createPost } from "../controllers/posts.js";
//setting up our router
const router = express.Router();

//callback function for when someone visits localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);

export default router;
