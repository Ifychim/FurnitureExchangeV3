import axios from 'axios';

//url that points to our back-end route
const url = 'http://localhost:5000/posts'; //ruturns all the posts e whave in the database

export const fetchPosts = () => axios.get(url);