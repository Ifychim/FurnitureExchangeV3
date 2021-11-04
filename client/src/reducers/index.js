import { combineReducers } from "redux";

import posts from './posts';
import auth from "./auth";
//holds the reducers we have
export default combineReducers({posts, auth});