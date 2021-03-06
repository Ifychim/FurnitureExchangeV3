import * as api from '../api';
//action constant imports. Increases scalability.
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING} from "../constants/actionTypes";

//Action Creators -> functions that return actions. Actions have type and payload(data)

export const getPosts = (page) => async (dispatch) => {

    try {
        //start loading once you get post from a single-page

        dispatch({type: START_LOADING});
        //get data from backend
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        //dispatch data to reducer
        
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });

        //end loading after data has been fetched from a single-page
        dispatch({type: END_LOADING});

        console.log("getpost(s) action dispatch \ndata: ");
        console.log(data);
    } catch (error) {
        console.log("getpost action error")
        console.log(error);
    }
};

export const getPost = (id) => async (dispatch) => {

    try {
        //start loading once you get post from a single-page

        dispatch({type: START_LOADING});
        //get data from backend
        const { data } = await api.fetchPost(id);
        //dispatch data to reducer
        
        dispatch({ type: FETCH_POST, payload: data});

        //end loading after data has been fetched from a single-page
        dispatch({type: END_LOADING});

        console.log("getpos(t) action dispatch \ndata: ");
        console.log(data);
    } catch (error) {
        console.log("getpost action error")
        console.log(error);
    }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        //communicate with back-end
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
        
        //const {data} = await api.fetchPostsBySearch(searchQuery);    
        console.log("getpostbysearch action dispatch \n data: uncomment at actions/getpostbysearch");
        //console.log(data);
    }catch(error){
        console.log("getpostbysearch action error");
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