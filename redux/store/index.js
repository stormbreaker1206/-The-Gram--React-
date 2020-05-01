import {createStore, combineReducers} from 'redux';
import Auth from "../reducers/authReducer";

const Store = createStore(
    combineReducers({
        auth: Auth
    })
)

export default Store;