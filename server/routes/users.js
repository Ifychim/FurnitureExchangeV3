//Routes that have to do with users. Will be handled with express.js
import express from 'express';
import {signin, signup } from "../controllers/users.js";
//updatePost
//creating instance of our router
const router = express.Router();

//post route to send data to the backend. From the form to the back end.
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
