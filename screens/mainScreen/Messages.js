import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import CustomButton from "../../components/customButtons/customButtons";

const Messages = (props)=> {

    const Redirect = ()=> {
        props.navigation.navigate('Home')
    }

    return(
        <View style={style.container}>
            <CustomButton text='Logout Out' onPress={Redirect} />
        </View>
    )
}

export default Messages

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})