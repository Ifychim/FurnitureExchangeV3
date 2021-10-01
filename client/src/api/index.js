import axios from 'axios'; //used to make api calls

//url that points to our back-end route
const url = 'http://localhost:5000/posts'; //returns all the posts we have in the database (url pointing to our back-end route)

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);