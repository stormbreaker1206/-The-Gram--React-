import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
class MyProfile extends React.Component{
    render() {
        return(
            <View style={style.container}>
                <Text>
                    My Profile
                </Text>
            </View>
        )
    }
}

export default MyProfile

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})