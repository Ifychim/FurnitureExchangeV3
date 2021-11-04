//logic of signing in and signing up a user.

//bcrypt to hash passwords, jwt for jsonwebtoken to store use in the browser for some period of time (if user leaves site he'll be able to stay logged in)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//importing user model
import User from "../models/user.js";

//creating our controllers for signing in and signing up. 

export const signin = async (req, res) => {
    //need to recieve email and password from the front end using the response in the rrequest body
    const {email, password} = req.body;

    try {
        //First find existing user by email (e.g person that is trying to sign in)
        const existingUser = await User.findOne({email});

        //if user doesnt exist in the database, return a 404 saying user does not exist
        if(!existingUser){
            return res.status(404).json({message:"User does not exist"});
        }
        //Second, check if the password is correct by comparing encrypted password to the one in the data base.
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        //Third check if the password is not correct
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //if user exists in the data base via email and if password is correct we get the jsonwebtoke to send to front-end. Token expires in 1 hour.
        const token =  jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        //console.log(error);
        //undefined server error = 500
        res.status(500).json({message: "something went wrong"});
    };
};

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName,} = req.body;

    try {
        const existingUser = await User.find({email});

        //if user exists in database
        if(existingUser){
            return res.status(404).json({message:"User already exists"});
        }

        //check if password is not equal to confirmed password.
        if(password !== confirmPassword){
            return res.status(404).json({message:"Passwords don't match, re-enter them."});
        }

        //good to go to create the user but first hash the password. with salt
        const hashedPassword = await bcrypt.hash(password, 12);
        
        //create user
        const result = await User.create({email, password: hashedPassword, name:`${firstName} ${lastName}`});

        //create token
        const token =  jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: result, token});
    } catch (error) {
        res.status(500).json({message: "something went wrong"});
    };
};