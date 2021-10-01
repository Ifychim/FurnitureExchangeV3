import * as api from '../api';

//Action Creators -> functions that return actions. Actions have type and payload(data)

export const getPosts = () => async (dispatch) => {

    try {
        //get data from backend
        const {data} = await api.fetchPosts();
        //dispatch data to reducer
        dispatch({type: 'FETCH_ALL', payload: []});
    } catch (error) {
        console.log(error.message);
    }
    //const action = {type: 'FETCH_ALL', payload: []}

    //dispatch(action);
}