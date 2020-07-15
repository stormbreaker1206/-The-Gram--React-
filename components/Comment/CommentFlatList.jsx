import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from "moment";
import {connect} from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { compose } from 'redux';
import {deleteComment, deletePostCount, blockUser} from '../../helpers/firebaseHelpers';
import {ifBlockExist} from '../../helpers/userUtilis';
const CommentFlatList = ({item, currentUser, showActionSheetWithOptions, getComment, currentUserData}) => {

  const getBlockedData = ifBlockExist(currentUserData, item.userId)
  

  const settings = (item)=>{
    const options = ['Delete',  'Cancel'];
    const cancelButtonIndex = 1;


    showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,

        },
        buttonIndex => {
        

            if(buttonIndex == 0){
              deleteComment(item.key).then((res)=>{
                getComment()
              })
              deletePostCount(item.postId, currentUser.uid)
            
            }
        },
    );
}

const reportSettings = (item, getBlockedData)=>{
  const options = [getBlockedData,  'Cancel'];
  const cancelButtonIndex = 1;


  showActionSheetWithOptions(
      {
          options,
          cancelButtonIndex,

      },
      buttonIndex => {
      

          if(buttonIndex == 0){
           blockUser(currentUser.uid, item.userId)
          }
      },
  );
}





    return (


        <View style={styles.feedItem}>


            <View>

                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={{uri: item.userImage}} style={styles.avatar}/>
                        <Text style={styles.name}>{item.handle}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>

                            <Text style={styles.timestamp}>{moment(item.timePosted).fromNow()}</Text>
                        </View>
                        {currentUser.uid == item.userId ? (
                          <TouchableOpacity onPress={()=>settings(item)}>
                          <Ionicons name="ios-more" size={24} color="#73788B" />
                          </TouchableOpacity>
                        ):(
                          <TouchableOpacity onPress={()=>reportSettings(item, getBlockedData)}>
                          <Ionicons name="ios-more" size={24} color="#73788B" />
                          </TouchableOpacity>
                        )}
                        
                    </View>

                    <Text style={styles.post}>{item.comments}</Text>



                </View>
            </View>
        </View>
      
    )

}
const mapStateToProps = ({auth: {currentUser, currentUserData}}) => ({
  currentUser,
  currentUserData
 
})

const wrapper = compose(
  connect(
    mapStateToProps
 
  ),
  connectActionSheet
);

export default wrapper (CommentFlatList);

const styles = StyleSheet.create({

    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,


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
        fontSize: 14,
        color: "black",
        fontFamily: 'OldStandardTT-Regular'

    },
    text: {
        fontFamily: 'OldStandardTT-Regular'
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 16
    },
    
deleteButton:{
  flex:1,
  backgroundColor:'red',
  justifyContent:'center',
  alignItems:'center',
  width: 80
}

});