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
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FIREBASE_CONFIG} from "./config/config";
import {connect} from 'react-redux';
import CustomDrawerNavigator from "./components/customDrawerComponent/CustomDrawerComponent";
import Settings from "./screens/mainScreen/Settings";
import Notification from "./screens/mainScreen/Notification";
import SplashScreen from "./screens/SplashScreen";
import MyProfile from "./screens/mainScreen/MyProfile";
import * as Font from "expo-font";
import Friends from "./screens/mainScreen/Friends";
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerComponent from "./components/customDrawerComponent/CustomDrawerComponent";
import HotTopics from "./screens/mainScreen/HotTopics";
import Messages from "./screens/mainScreen/Messages";
import Post from "./screens/mainScreen/Post";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

class Root extends React.Component{
    constructor() {
        super();
        this.initializeFirebase();

    }

    async componentDidMount() {
        this.checkIfLoggedIn()

        await Font.loadAsync({
            'OldStandardTT-Regular': require('./assets/fonts/OldStandardTT-Regular.ttf')
        });

    }
    checkIfLoggedIn = () => {
        let unsubscribe
        try {
           unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if(user){
                    //sign in user
                    this.props.signIn(user)
                    console.log('user sign in')
                }else {
                    console.log('no user signed in')
                    //sign out user
                  this.props.signOut()
                }
                unsubscribe();
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



const HomeTabNavigator = () => (
    <Tabs.Navigator

        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'ios-home'
                        : 'ios-arrow-round-back';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Notification') {
                    iconName = focused ? 'md-notifications' : 'ios-notifications-outline';
                }
                else if (route.name === 'HotTopics') {
                    iconName = focused ? 'md-heart' : 'md-heart-empty';
                }
                else if (route.name === 'Post') {
                    iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}

        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
    >
        <Tabs.Screen  name="Home" component={UserFeed} />
        <Tabs.Screen name="Notification" component={Notification} />
        <Tabs.Screen name="Post" component={Post} />
        <Tabs.Screen name="HotTopics" component={HotTopics} />
        <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
)

const getHeaderTitle = route =>{
    const routName = route.state ?  route.state.routes[route.state.index].name : 'Home'

    switch (routName) {
        case "Home":
            return "Home"
        case "Notification":
            return "Notification"
        case "Friends":
            return "Friends"
        case "Settings":
            return "Settings"
        case "HotTopics":
            return "HotTopics"
        case "Post":
            return ""
    }
}
const HomeStackNavigator = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerLeft:() => (
            <Ionicons onPress={() => navigation.openDrawer()} name="ios-menu" size={30} color="green" style={{marginLeft:10}} color='black' />

        )
    }}>
        <Stack.Screen
            options={({route}) => ({
                title:getHeaderTitle(route)
            })}
            name="HomeTabNavigator" component={HomeTabNavigator}/>
    </Stack.Navigator>
)

const AppDrawerNavigator = () => (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerComponent{...props}/>}
    >
        <Drawer.Screen options={{drawerIcon: ()=> <Ionicons name="ios-home" size={24} />}} name="Home" component={HomeStackNavigator} />
        <Drawer.Screen options={{drawerIcon: ()=> <Ionicons name="ios-contact" size={24} />}} name="MyProfile" component={MyProfile} />
        <Drawer.Screen  options={{drawerIcon: ()=> <Ionicons name="ios-chatboxes" size={24} />}} name="Messages" component={Messages} />
        <Drawer.Screen options={{drawerIcon: ()=> <Ionicons name="ios-contacts" size={24} />}} name="Friends" component={Friends}/>

    </Drawer.Navigator>
);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToprops) (Root);
