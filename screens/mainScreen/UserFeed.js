import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
class UserFeed extends React.Component{
    render() {
        return(
            <View style={style.container}>
                <Text>
                User Feed
                </Text>
            </View>
        )
    }
}

export default UserFeed

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})