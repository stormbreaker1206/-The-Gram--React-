import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import  * as firebase from 'firebase/app';
import 'firebase/auth';
import Login from "./screens/Login";
import MainScreen from "./screens/mainScreen/MainScreen";
import UserFeed from "./screens/mainScreen/UserFeed";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator, DrawerItem} from "@react-navigation/drawer"
import {FIREBASE_CONFIG} from "./config/config";
import {connect} from 'react-redux';
import Settings from "./screens/mainScreen/Settings";
import SplashScreen from "./screens/SplashScreen";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class Root extends React.Component{
    constructor() {
        super();
        this.initializeFirebase();

    }

    componentDidMount() {
        this.checkIfLoggedIn()

    }
    checkIfLoggedIn = () => {
        try {
            firebase.auth().onAuthStateChanged(user => {
                if(user){
                    //sign in user
                    this.props.signIn()
                    console.log('user sign in')
                }else {
                    console.log('no user signed in')
                    //sign out user
                  this.props.signOut()
                }
            })
        }catch (e) {
            //sign out
           this.props.signOut()
            console.log(e)
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
        if(this.props.auth.isLoading){
            return <SplashScreen/>;
        }

        return (
                <NavigationContainer>
                    {!this.props.auth.isSignedIn ? (
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

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}

const mapDispatchToprops = dispatch =>{
    return{
        signIn: user => dispatch({type:'SIGN_IN', payload:user}),
        signOut: () => dispatch({type: 'SIGN_OUT'})
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

export default connect(mapStateToProps, mapDispatchToprops) (Root);
