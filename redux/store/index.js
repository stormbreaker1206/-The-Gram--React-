import {createStore, combineReducers} from 'redux';
import Auth from "../reducers/authReducer";
import userPostData from "../reducers/UserPostReducer";
import hotTopics from "../reducers/hotTopicsReducer";
import userData from "../reducers/userDataReducer";
const Store = createStore(
    combineReducers({
        auth: Auth,
        userPostData: userPostData,
        hotTopics: hotTopics,
        userData: userData,



     
    })
)

export default Store;