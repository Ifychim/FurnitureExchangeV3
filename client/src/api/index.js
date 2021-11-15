import axios from 'axios'; //used to make api calls
import { signin } from '../actions/auth';

const config = {
    headers: {
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
    }
};

const API = axios.create({ baseURL: 'http://localhost:5000' });

//url that points to our back-end route
const url = 'http://localhost:5000/posts'; //returns all the posts we have in the database (url pointing to our back-end route)
const url2 = 'http://localhost:5000/user';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, JSON.stringify(newPost), config);

//Error here....
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const signIn = (formData) => axios.post(url2, JSON.stringify(formData), config);

export const signUp = (formData) => API.post('/user/signup', formData);

//problem with middle-ware