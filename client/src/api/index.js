import axios from 'axios'; //used to make api calls




//const url = 'http://localhost:5000/posts'; //returns all the posts we have in the database (url pointing to our back-end route)
//export const createPost = (newPost) => axios.post(url, JSON.stringify(newPost), config);
//export const deletePost = (id) => axios.delete(`${url}/${id}`);
//export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
//export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

//url that points to our back-end route
const API = axios.create({ baseURL: 'http://localhost:5000' });

//Helps our middle ware work by adding something specific to each one of our request. We need to send token to the back-end so we can verify that user is logged in.
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {

    //Bearer token {token being parsed with JSON}
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//query parameter
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
