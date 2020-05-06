import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import {getCurrentTime} from "../../helpers/userUtilis";
import { Ionicons } from '@expo/vector-icons';
import {compose} from "redux";
import {connectActionSheet} from "@expo/react-native-action-sheet";
import {openCamera,openImageLibrary} from "../../helpers/ImageHelpers";

class Post extends React.Component{

    state={
        text: '',
        image: null
    }

    addPost = ()=>{
        const options = ['Select from photos ', 'Camera', 'Cancel'];
        const cancelButtonIndex = 2;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected

                if(buttonIndex == 0){
                    this.openImageLibrary()
                }else if(buttonIndex == 1){
                    this.openCamera()
                }
            },
        );
    }

    openImageLibrary = async () =>{
        const results = await openImageLibrary()

        if(results){

            this.setState({image: results.uri})
        }
    }

    openCamera = async () => {

        const results = openCamera()
        if(results){
          //
            const imageUri = (await results).uri
            this.setState({image: imageUri})

        }

    }


    render() {
        return(

            <SafeAreaView style={styles.containerInput}>

            <View style ={styles.container}>

                <Image source={require("../../assets/gossip.png")} style={styles.avatar}></Image>

                <TextInput autoFoucs={true} multiline={true} numberOfLines={4} style={{flex:1}} placeholder="What's the latest?"></TextInput>

            </View>
                <TouchableOpacity onPress={this.addPost} style={styles.photo}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB"/>

                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    <Image source={this.state.image ? {uri: this.state.image } : null} style={styles.displayImage}></Image>

                </View>

            </SafeAreaView>

        )
    }
}

export default  connectActionSheet(Post);

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