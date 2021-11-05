/*Starting point of server application.
Dependencies 
-> body parsers (for post requests -> we use express due to deprecation)
-> cors (for cross-origin requests)
-> express (framework for creating application routing)
-> mongoose (models for post)
-> nodemon (automatically resets server every time a change is made.)
-> to allow "import" syntax, navigate to package.json and add type:module, to run server w/nodemon add script start: nodemon index.js
*/

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
/*
import PostMessage from "./models/postMessage.js";
import { getPosts } from '../client/src/actions/posts.js';*/

import { getPosts, createPost, updatePost, deletePost, likePost } from "./controllers/posts.js";
import dotenv from 'dotenv';

//initialize the app with express
const app = express();
dotenv.config();

app.use(cors());

//setting up bodyparser to send requests
//Body Parser library has been deprecated(express 4.16+) so we changed to app.use(express.func());
app.use(express.json({limit: "30mb", extended:true}));
app.use(express.urlencoded({limit: "30mb", extended:true}));

//connecting express routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello to Furniture Exchange API");
})


//connect our application to database mongodb.com/cloud/atlas
//Environmental variable to store connection URL
//const CONNECTION_URL = "mongodb+srv://ifychim:asdasdasd1@furnitureexchangecluste.mzrrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000; //heroku will populate this later once deployed

//mongoose to connect to database (connect returns a promise) if successful, listen to the app on specified port & callback function to run once application listens 
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

