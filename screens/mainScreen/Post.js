import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';

class Post extends React.Component{

    render() {
        return(

        <View></View>

        )
    }
}


export default  Post;

const styles = StyleSheet.create({
    containerInput:{
        flex:1
    },
    container:{
       margin:32,
       flexDirection:"row"
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,


    },
    photo:{
        alignItems: "flex-end",
        marginHorizontal:32
    },
    imageContainer:{
        marginTop:32,
        height:300,

    },
    displayImage:{
        width:'100%',
        height:'100%'

    }
})