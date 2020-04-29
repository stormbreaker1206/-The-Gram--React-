import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as Font from 'expo-font';
import CustomButton from "../components/customButtons/customButtons";

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
       await Font.loadAsync({
            'OldStandardTT-Regular': require('../assets/fonts/OldStandardTT-Regular.ttf')
        });
        this.setState({fontLoaded:true});
    }
    render() {
        return (
            <LinearGradient colors={['#BD0ADA', '#E9A1F4']} style={styles.gradient}>

                {this.state.fontLoaded? ( <View style={styles.container}>

                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/gossip.png')}/>
                        <Text style={styles.mainText}>The Gram</Text>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.mainText}>
                            We are Anonmymous, we are private, We do share anyone’s identify, Dont expect us to! test
                        </Text>
                        <CustomButton text='Login/Sign up' onPress={this.redirect} />
                    </View>

                </View>): ( <ActivityIndicator color = 'white' size = "large" style = {styles.activityIndicator}/>) }



            </LinearGradient>
        );
    }




}
export default Login;
const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    iconContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer:{
        flex:1,
        alignItems: 'center',



    },

    gradient: {
        flex: 1,
    },
    mainText:{
        color:'white',
        fontFamily: 'OldStandardTT-Regular',
        textAlign: 'center'

    },

    welcomeText:

        {
            fontWeight: '100'
        },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }


});
