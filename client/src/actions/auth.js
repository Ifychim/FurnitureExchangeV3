import * as api from '../api';
//action constant imports. Increases scalability.
import {AUTH} from "../constants/actionTypes";


//acton creator which returns an action. redux thunk format
export const signin = (formData, history) => async (dispatch) => {
    try {
        //send data to the database/backend to authenticate/login user.

        //navigate to home page
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        //send data to the database/backend to authenticate/sign up user.

        //navigate to home page
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};