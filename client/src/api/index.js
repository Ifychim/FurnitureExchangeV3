import axios from 'axios'; //used to make api calls

const config = {
    headers: {
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
    }
};

//url that points to our back-end route
const url = 'http://localhost:5000/posts'; //returns all the posts we have in the database (url pointing to our back-end route)

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, JSON.stringify(newPost), config);

//Error here....
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
