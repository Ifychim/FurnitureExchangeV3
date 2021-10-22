//Routes that have to do with posts e.g cards. Will be handled with express.js

import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js";
//updatePost
//setting up our router
const router = express.Router();

//callback function for when someone visits localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);

/*router.post('/', (request, response) => {
    console.log(request.body);

});
*/

//patch route for updating existing documents 
//error with this route!!!!
router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
