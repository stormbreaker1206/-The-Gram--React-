import {createStore, combineReducers} from 'redux';
import Auth from "../reducers/authReducer";
import userPostData from "../reducers/UserPostReducer";
import userData from "../reducers/userDataReducer";

const Store = createStore(
    combineReducers({
        auth: Auth

     
    })
)

export default Store;