import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./screens/Login";
import MainScreen from "./screens/mainScreen/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {FIREBASE_CONFIG} from "./config/config";
import * as firebase from "firebase";
const Stack = createStackNavigator();

class App extends React.Component{
    constructor() {
        super();
        this.initializeFirebase();
    }

    initializeFirebase() {
        try {
            if (FIREBASE_CONFIG.apiKey) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
        } catch (err) {
            // ignore app already initialized error on snack
        }

    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
                    <Stack.Screen name="MainScreen"
                                  component={MainScreen}
                                  options={{ headerBackTitleVisible: false, title: 'Phone Verification'}}

                    />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
