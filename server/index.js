/*Starting point of server application.
Dependencies 
-> body parsers (for post requests)
-> cors (for cross-origin requests)
-> express (framework for creating application routing)
-> mongoose (models for post)
-> nodemon (automatically resets server every time a change is made.)
-> to allow "import" syntax, navigate to package.json and add type:module, to run server w/nodemon add script start: nodemon index.js
*/

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

//initialize the app with express
const app = express();

//connecting express routes
app.use('/posts', postRoutes);

//setting up bodyparser to send requests
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

//connect our application to database mongodb.com/cloud/atlas
//Environmental variable to store connection URL
const CONNECTION_URL = "mongodb+srv://ifychim:asdasdasd1@furnitureexchangecluste.mzrrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000; //heroku will populate this later once deployed

//mongoose to connect to database (connect returns a promise) if successful, listen to the app on specified port & callback function to run once application listens 
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

