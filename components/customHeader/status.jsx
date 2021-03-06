import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {AntDesign, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import { connectActionSheet } from '@expo/react-native-action-sheet';
import {privacySettings} from "../../helpers/firebaseHelpers";
import { compose } from 'redux';
let settings = ''
const Status = ({ navigation}) =>{


    return(


        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>


            <TouchableOpacity style={styles.follow}>

                <Text style={styles.followText}>Level 1 Kudos Badge</Text>
                <SimpleLineIcons style={styles.icon} name="badge" size={24} color="white" />

            </TouchableOpacity>
            <TouchableOpacity  style={styles.followSettings}>
                <AntDesign name="sharealt" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={styles.followSettings}>
                <Ionicons  name="ios-more" size={24} color="black" />
            </TouchableOpacity>


        </View>



    )

}


export default Status

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginBottom: 8,
        backgroundColor: '#0078ff',
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
        fontSize: 12,
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

    follow:{
        justifyContent:'center',
       alignItems:'center',
        backgroundColor:'#0078ff',
        width:250,
        height:40,
        borderRadius: 10,
        flexDirection: 'row',
        //paddingHorizontal: 24,
        // paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,


    },
    followSettings:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e9ebee',
        height:40,
        width:50,
        borderRadius: 10,
        //  flexDirection: 'row',
        //paddingHorizontal: 24,
        paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,

    },
    followText:{
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        fontFamily: "OldStandardTT-Regular",
        marginTop: Platform.OS == "ios" ? 5 : 0,
        marginRight: Platform.OS == "ios" ? 0 : 5
    },
    icon:{
        paddingLeft: Platform.OS == "ios" ? 8 : 0
    }

});