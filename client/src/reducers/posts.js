//a reducer is a function that accepts state and action. based on the action type, do some logic, return action or state.
import {FETCH_ALL, FETCH_POST,  CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from "../constants/actionTypes";
 export default (state = {isLoading: true, posts:[]}, action) => {
     
    switch(action.type) {
        case FETCH_ALL:
            return { 
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
            }
        case FETCH_POST:
            return{
                ...state,
                post: action.payload.data,
            }
        case START_LOADING: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case END_LOADING: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }; //spread post data and add a new post.
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case LIKE:
            //Map returns an array. We check if the post id is equal to the payload id. If it is, we return the payload, else return the post as it is. 
            //Action.payload == newlyupdated post.
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            //Filter out the post that is deleted.
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;

    }
};