import React from 'react';
import {StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Header from "../../components/customHeader/Header";

const Messages = (props)=> {

    const Redirect = ()=> {
        props.navigation.navigate('Home')
    }

    return(
       <Header onPress={Redirect} name='create' text='Messaging'/>
    )
}

export default Messages

const style = StyleSheet.create({
   header:{
      height: 60,
       flexDirection:'row',
       justifyContent:'space-between'

   }
})