import axios from 'axios'; //used to make api calls

const config = {
    headers: {
      //'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
    }
};

//create base url just so the API can make different called to the users and not only the post
const API = axios.create({ baseURL: 'http://localhost:5000' });

//const url = 'http://localhost:5000/posts';

//export const fetchPosts = () => axios.get(url);
export const fetchPosts = () => API.get('/posts');

//export const createPost = (newPost) => API.post(url, JSON.stringify(newPost), config);
export const createPost = (newPost) => API.post('/posts', newPost)

//export const updatePost = (id, updatedPost) => API.patch(`${url}/${id}`, updatedPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

//export const deletePost = (id) => API.delete(`${url}/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//export const likePost = (id) => API.patch(`${url}/${id}/likePost`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//routes error again -_____-
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
