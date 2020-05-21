import React from 'react';
import { StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight, Modal} from 'react-native';
import {Container, Left, Right, Body, Header, Content, Footer, Button, FooterTab, Spinner} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {Video} from "expo-av";

const ImageModalView = ({ onPress, selectedItem, isVisible, userLikedPost})=> {

   
const showImage = (item)=>{
    alert(item.image)
}

    return(
        <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
      
        >
          <View style={styles.centeredView}>
                        
            <View style={styles.modalView}>
            
            <View style={styles.header}>
                <TouchableHighlight
                    onPress={onPress}
                >
                    <Ionicons color='#73788B'  name="ios-close-circle" size={24} />
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>showImage(selectedItem)}>
                <Ionicons name="ios-more" size={24} color="#73788B" />
                </TouchableHighlight>
        </View>
    
        <View style={{flex:1}}>
       
        <Image  source={{uri: selectedItem.image}} resizeMode='stretch' style={styles.postImage} />
     
        </View>
        <View style={{flex:1}}>
        <Text style={styles.modalText}>{selectedItem.status}</Text>
        <View style={{ flexDirection: "row", paddingLeft: 8 }}>
            <Ionicons name={userLikedPost} size={24} color="#BD0ADA" style={{ marginRight: 16 }} />
             <Ionicons name="ios-chatboxes" size={24} color="#BD0ADA" />
        </View>
        </View>
        
         
            </View>
            
        
          </View>
        </Modal>
      
      </View>
    )
}

export default ImageModalView

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
     // marginTop: 22
    },
    modalView: {
    height:700,
     width: '100%',
      //margin: 20,
      backgroundColor: "#212a3b",
     // borderRadius: 20,
      padding: 35,
     // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
     textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
        marginTop: 14,
        fontSize: 18,
        color: "white",
        fontFamily: 'OldStandardTT-Regular'
    },
    header:{
        height: 60,
       marginTop: 20,
        flexDirection:'row',
        justifyContent:'space-between'

    },  postImage: {
        width: '100%', 
        height: '100%',
        borderRadius: 5,
      
    }
  });
  