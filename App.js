import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./screens/Login";
import MainScreen from "./screens/mainScreen/MainScreen";
import UserFeed from "./screens/mainScreen/UserFeed";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {FIREBASE_CONFIG} from "./config/config";
import * as firebase from "firebase";
import Settings from "./screens/mainScreen/Settings";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class App extends React.Component{
    constructor() {
        super();
        this.initializeFirebase();
        this.state = {
            isLoggedIn: true,
            isSignedIn: false
        }
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
                {this.state.isSignedIn ? (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
                        <Stack.Screen name="MainScreen"
                                      component={MainScreen}
                                      options={{ headerBackTitleVisible: false, title: 'Phone Verification',
                                          headerTitleStyle:{
                                              fontFamily: 'OldStandardTT-Regular'
                                          }}}

                        />

                    </Stack.Navigator>
                ) : (
                    <AppDrawerNavigator/>
                )}

            </NavigationContainer>


        );
    }


}

const AppDrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="UserFeed" component={UserFeed} />
        <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
