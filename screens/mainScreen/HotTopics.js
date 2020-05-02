import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
class HotTopics extends React.Component{
    render() {
        return(
            <View style={style.container}>
                <Text>
                    Hot Topics
                </Text>
            </View>
        )
    }
}

export default HotTopics

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})