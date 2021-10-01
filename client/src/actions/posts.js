import * as api from '../api';

//Action Creators -> functions that return actions. Actions have type and payload(data)

export const getPosts = () => async (dispatch) => {

    try {
        //get data from backend
        const {data} = await api.fetchPosts();
        //dispatch data to reducer
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post); //creating a POST api request to our backend server

        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}