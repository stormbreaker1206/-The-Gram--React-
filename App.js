import React from 'react';
import Root from "./root";
import {Provider} from 'react-redux';
import Store from './redux/store/index';

class App extends React.Component{


    render() {
        return (

            <Provider store={Store}>
            <Root/>
            </Provider>
        );
    }


}


export default App;
