import React from 'react';
import {StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableHighlight} from 'react-native';
import  {TouchableOpacity} from 'react-native-gesture-handler'
import {Ionicons} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";

const Header = ({text, onPress, name})=> {



    return(
        <View style={{flex:1, paddingTop: 25, backgroundColor: 'white'}} >

            <View style={style.header}>
                <TouchableOpacity
                    onPress={onPress}
                >


                    <Ionicons color='black' style={{paddingLeft:10}} name="ios-arrow-back" size={24} />

                </TouchableOpacity>

                <Text style={{fontFamily: 'OldStandardTT-italic',
                    fontSize: 24}}>{text}</Text>

                    <MaterialIcons color='white' style={{paddingRight:10}} name={name} size={24} />


            </View>

        </View>
    )
}

export default Header

const style = StyleSheet.create({
    header:{
        height: 60,
        flexDirection:'row',
        justifyContent:'space-between'

    }
})