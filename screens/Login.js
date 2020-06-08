import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
const {width, height}= Dimensions.get('window');
class Login extends React.Component{



    constructor(){
        super()
        this.state={
            fontLoaded: false

        }
    }

    redirect = () =>{
        this.props.navigation.navigate('MainScreen')
    }

    async componentDidMount(){

        this.setState({fontLoaded:true});
    }
    render() {
        return (
    <View style={{flex:1}}>
        {this.state.fontLoaded? (  <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Swiper autoplay={true}>
            <View style={styles.slide}>
                <Image source={require('../assets/Welcome.png')} style={styles.image}/>
            </View>
            <View style={styles.slide}>
                <Image source={require('../assets/HotTopics.png')} style={styles.image}/>
            </View>
            <View style={styles.slide}>
                <Image source={require('../assets/chat.png')} style={styles.image}/>
            </View>
        </Swiper>
        <View style={styles.buttonContainer}>
            <View style={styles.login}>
                <TouchableOpacity onPress={this.redirect}>
                <Text style={styles.textFont}>Sign up/ Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>):
            ( <ActivityIndicator color = 'black' size = "large" style = {styles.activityIndicator}/>) }

    </View>
        )
    }



}


export default Login;
const styles = StyleSheet.create({
    container: {
       flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: width,
        height: height
    },

    buttonContainer:{
       // flex:1,
        position: 'absolute',
        bottom: 70,
        height: 60,
        marginLeft: 20,
       //alignItems: 'center',
       //justifyContent: 'center'

    },
    login:{

        width: 180,
        height: 50,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textFont:{
        fontFamily: 'OldStandardTT-Regular',
        fontWeight: '100'
    },

     activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    }


});
