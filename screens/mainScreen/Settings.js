import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
class Settings extends React.Component{
    render() {
        return(
            <View syle={style.container}>
                <Text>
                    Settings
                </Text>
            </View>
        )
    }
}

export default Settings

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})