import React from 'react';
import Root from "./root";
import {Provider} from 'react-redux';
import Store from './redux/store/index';
import {ActionSheetProvider} from "@expo/react-native-action-sheet";


class App extends React.Component{


    render() {
        return (

            <Provider store={Store}>
                <ActionSheetProvider>

            <Root/>
                </ActionSheetProvider>
            </Provider>
        );
    }


}


export default App;
