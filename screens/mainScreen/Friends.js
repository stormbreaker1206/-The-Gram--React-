import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
class Friends extends React.Component{
    render() {
        return(
            <View style={style.container}>
                <Text>
                    Friends
                </Text>
            </View>
        )
    }
}

export default Friends

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})