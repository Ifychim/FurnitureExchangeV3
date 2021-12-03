import * as api from '../api';
//action constant imports. Increases scalability.
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH} from "../constants/actionTypes";

//Action Creators -> functions that return actions. Actions have type and payload(data)

export const getPosts = (page) => async (dispatch) => {

    try {
        //get data from backend
        const {data} = await api.fetchPosts(page);
        //dispatch data to reducer
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        //communicate with back-end
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);

        dispatch({type: FETCH_BY_SEARCH, payload: data});
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {

        const {data} = await api.createPost(post); //creating a POST api request to our backend server
        //console.log(data);

        dispatch({type: CREATE, payload: data});
        
    } catch (error) {
        console.log(error);
    }
}

/*ERRORS HERE!!!!*/
export const updatePost = (id, post) => async (dispatch) => {

    try{
        //api request to update post
        const {data} = await api.updatePost(id, post);
        
        dispatch({type: UPDATE, payload: data});
    }catch (error){
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload:id});

    }catch(error){
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: LIKE, payload: data});

    } catch (error) {
        console.log(error)
    }
}