import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import AnimatedLottieView from "lottie-react-native";
const SplashScreen = () => (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#BD0ADA'}}>
        <AnimatedLottieView style={{height:200, width:200}} autoPlay={true} loop={true} source={require('../assets/loading.json')}/>
    </View>
)

export default SplashScreen;