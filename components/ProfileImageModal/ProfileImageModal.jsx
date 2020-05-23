import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import { Platform } from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getName} from "../../helpers/firebaseHelpers";
import Header from '../customHeader/Header';

import {Video} from "expo-av";
import {Spinner} from "native-base";
import Status from "../customHeader/status";


const ProfileImageModal = ({ isViewProfile, selectedUser, onPress})=> {

    return(
        <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isViewProfile}
      
        >

          <View style={styles.centeredView}>

            <View style={styles.modalView}>
                <TouchableOpacity
                    onPress={onPress}
                >
              <View style={styles.header}>


                        <Ionicons color='black'  name="ios-arrow-back" size={24} />


                    <Text style={styles.textStyle}> {selectedUser} </Text>
                    <MaterialIcons name="account-circle" size={24} color="white" />

                </View>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/white-bg.jpg')} style={styles.avatar}></Image>
                </View>

                <View style={styles.container}>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Grammers</Text>
                    </View>
                    <View style={[styles.statContainer, styles.divider]}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Posts</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Kudos</Text>
                    </View>

                </View>

                <View style={{flex:1, marginTop: 8}}>
                    <Text style={styles.postText}>Posts</Text>
                </View>

            </View>



          </View>
        </Modal>
      
      </View>
    )
}

export default ProfileImageModal

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
    //  alignItems: "center",
      marginTop: Platform.OS === 'ios' ? 30 : 40
    },
    modalView: {
    height:700,
     width: '100%',
      //margin: 20,
      backgroundColor: "white",
     // borderRadius: 20,
     // padding: 35,
      //alignItems: "center",
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
      color: "black",
      fontSize: 24,
      fontFamily: 'OldStandardTT-Regular'
    },
    header:{
        height: 60,
        marginTop: 20,
        padding:10,
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    imageContainer:{
        marginTop:16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:32,

    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginBottom: 8,
        backgroundColor: 'black',
        marginHorizontal: 16,
        borderRadius: 16,
        marginTop: 25
    },
    text:{
        color:'white'
    },
    statContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    number:{
        fontSize: 20,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular"

    },
    stat:{
        fontSize: 11,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular",
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 6
    },
    divider:{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',

    },
    postText:{
        fontFamily: "OldStandardTT-Regular",
        color:'black',
        fontWeight:'700',
        fontSize: 15,
        textAlign:'center'

    }
  });
  