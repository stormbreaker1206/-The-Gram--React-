import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {Ionicons, Octicons} from "@expo/vector-icons";
import moment from "moment";
import {Video} from "expo-av";
import {checkLikesCount, checkRumourCount, checkLikes, checkAuthenticCount, checkCommentsCount} from "../../helpers/userUtilis";
import {connect} from 'react-redux';
import {updateLike, deletePost} from '../../helpers/firebaseHelpers'
import { compose } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import EditUserPost from "../EditPostComponent/EditPost";
import VideoPlayer from '../VideoComponent/Video'

const UserPost = ({item, auth, showActionSheetWithOptions, navigation, getData} ) =>{
    const [Visible, setVisible] = useState(false);
    const userlike = checkLikes(item, auth.currentUser.uid);
    let userLikedPost = '';
    let iconColor = '';
    if(userlike[0] === auth.currentUser.uid){
         userLikedPost = 'ios-heart';
         iconColor = '#90949c'
    }else{
         userLikedPost = 'ios-heart-empty';
         iconColor = 'black';
    }

    const editComments = ()=>{
        setVisible(!Visible)
    }


   const settings = (item)=>{
        const options = ['Edit','Delete ',  'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected

                if(buttonIndex == 0){
                
                    editComments()

                }else if(buttonIndex == 1){
               createTwoButtonAlert()
                }
            },
        );
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Message",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                     style: "cancel"
                },
                { text: "Delete", onPress: () => deletePost(item)

                }
            ],
            { cancelable: false }
        );

    return(

        <View>
       
        <EditUserPost onPress={editComments} item={item}  isVisible={Visible}/>
       
        <View style={styles.feedItem}>

      <View>

        <View style={{ flex: 1 }}>
            <View style= {{flexDirection: "row", alignItems: "center", padding:10 }}>
            <Image source={{uri: item.proPic}} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft:12, paddingRight:10 }}>
                <View>

                    <Text style={styles.timestamp}>{moment(item.time).fromNow()}</Text>
                </View>
                {auth.currentUser.uid === item.id ?(
                    <TouchableOpacity onPress={()=>settings(item)}>
                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </TouchableOpacity>
                ) : null}


            </View>
            {item.type === "text" ? (

                <Text style={styles.post}>{item.status}</Text>


            ): (
                <View>

                    <Text style={styles.post}>{item.status}</Text>

                    {item.type === "video" ? (
                       
                     <VideoPlayer item={item.image}/>
                        
                    ): (
                      
                       <Image source={{uri: item.image}} style={styles.postImage} resizeMode="cover" />
                        
                    )}
                </View>

            )}

            <View style={{flex:1}}>
            <View style={{ flexDirection: 'row', paddingLeft: 8 }}>

                 <Text style={[styles.text, {color:'black', alignItems:'center'}]}>{checkLikesCount(item)}</Text>
                <TouchableOpacity onPress={()=>updateLike(item, auth.currentUser.uid)}>
               
                <Ionicons name={userLikedPost} size={24} color={iconColor} style={{paddingLeft:5, marginRight: 16 }} />
                
                </TouchableOpacity>
                <Text style={[styles.text, {color:'black', alignItems:'center'}]}>{checkCommentsCount(item)}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Comment', {id: item.key})}>
                <Octicons style={{ paddingLeft: 5 }} name="comment" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flex:1, marginLeft:80, paddingLeft: 8, paddingBottom:5, justifyContent:'space-evenly', alignItems:'center', }}>



                <Text style={styles.text}>{checkRumourCount(item)} Rumour</Text>
                    <Text style={styles.text}>{checkAuthenticCount(item)} Authentic</Text>
                    
                </View>
            </View>
            </View>
        </View>
    </View>
    </View>

        </View>
    )

}

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}
const wrapper = compose(
    connect(
      mapStateToProps
   
    ),
    connectActionSheet
  );

export default wrapper(UserPost);

const styles = StyleSheet.create({

    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
      //  padding: 8,

    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "black",
        fontFamily: 'OldStandardTT-Regular'

    },
    timestamp: {
        fontSize: 14,
        color: "#C4C6CE",
        marginTop: 4,
        fontFamily: 'OldStandardTT-Regular'
    },
    post: {
        marginTop: 14,
        fontSize: 18,
        color: "black",
        fontFamily: 'OldStandardTT-Regular',
        paddingLeft:10

    },
    text:{
        fontFamily: 'OldStandardTT-Regular'
    },
    postImage: {
        width: undefined,
        height: 300,
       // borderRadius: 5,
        marginVertical: 16
    }


});