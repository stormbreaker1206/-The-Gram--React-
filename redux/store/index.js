import {createStore, combineReducers} from 'redux';
import Auth from "../reducers/authReducer";
import userPostData from "../reducers/UserPostReducer";
import hotTopics from "../reducers/hotTopicsReducer";
import userData from "../reducers/userDataReducer";
import userSettings from "../reducers/userSettingsReducer";

const Store = createStore(
    combineReducers({
        auth: Auth,
        userPostData: userPostData,
        hotTopics: hotTopics,
        userData: userData,
        userSettings: userSettings

    })
)

export default Store;