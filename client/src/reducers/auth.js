import {AUTH, LOGOUT} from "../constants/actionTypes";

//reducers are functions which accept state as well as the action
const authReducer = (state={authData: null}, action ) => {
    switch(action.type)
    {
        case AUTH:
            //need to store data in local storage and set profile with the data dispatched from the action
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        default:
            return state;
    };
};

export default authReducer;