import React from 'react';
import {StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Header from "../../components/customHeader/Header";

const Messages = ({navigation})=> {

    const Redirect = ()=> {
        navigation.navigate('Home')
    }

    return(
        <View style={{flex:1}}>
       <Header onPress={Redirect} name='create' text='Messaging'/>

       <TouchableOpacity onPress={()=>navigation.push('Chat')} style={{flex:1}}>
           <Text>test</Text>
       </TouchableOpacity>
        </View>
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