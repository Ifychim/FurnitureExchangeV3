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

//initialize the app

const app = express();

//setting up bodyparser to send requests
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

//connect our application to database