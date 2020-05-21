import React from 'react';
import {StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Badge} from 'native-base'
import {Ionicons, Octicons} from "@expo/vector-icons";
import ImageModalView from "../ImageModalComponent/ImageModalView";
import moment from "moment";
import {Video} from "expo-av";
import {checkLikes} from "../../helpers/userUtilis";
import {connect} from 'react-redux';
import {updateLike} from '../../helpers/firebaseHelpers'
import { compose } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
const UserPost = ({item, auth, showActionSheetWithOptions} ) =>{

    const userlike = checkLikes(item, auth.currentUser.uid);
    let userLikedPost = '';
    let iconColor = '';
    if(userlike[0] === auth.currentUser.uid){
         userLikedPost = 'ios-heart';
         iconColor = '#BD0ADA'
    }else{
         userLikedPost = 'ios-heart-empty';
         iconColor = 'black';
    }

   const settings = ()=>{
        const options = ['Delete ', 'Re-post', 'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected

                if(buttonIndex == 0){
                  //  this.openImageLibrary()
                }else if(buttonIndex == 1){
                   // this.openCamera()
                }
            },
        );
    }

    return(
        <View style={styles.feedItem}>
           
                
        
      <View>

        <View style={{ flex: 1 }}>
            <View style= {{flexDirection: "row", alignItems: "center" }}>
            <Image source={{uri: item.proPic}} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>

                    <Text style={styles.timestamp}>{moment(item.time).fromNow()}</Text>
                </View>
                <TouchableOpacity onPress={settings}>
                <Ionicons name="ios-more" size={24} color="#73788B" />
                </TouchableOpacity>
            </View>
            {item.type === "text" ? (
                <Text style={styles.post}>{item.status}</Text>

            ): (
                <View>
                    <Text style={styles.post}>{item.status}</Text>
                    {item.type === "video" ? (
                       
                     
                        <Video
                           
                            source={item.image ? {uri: item.image } : null}
                            posterSource={{uri: 'https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40'}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay={false}
                            isLooping={false}
                            useNativeControls
                            resizeMode="cover"
                            style={{ height: 300,  borderRadius: 5,
                            marginVertical: 16, alignItems:'center' }}
                        />
                        
                    ): (
                      
                       <Image loadingIndicatorSource={{uri: 'https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40'}}
                        source={{uri: item.image}} style={styles.postImage} resizeMode="cover" />
                        
                    )}
                </View>

            )}

            <View style={{flex:1}}>
            <View style={{ flexDirection: 'row', paddingLeft: 8 }}>

                 <Text style={[styles.text, {color:'black', alignItems:'center'}]}>1</Text>
                <TouchableOpacity onPress={()=>updateLike(item, auth.currentUser.uid)}>
               
                <Ionicons name={userLikedPost} size={24} color={iconColor} style={{paddingLeft:5, marginRight: 16 }} />
                
                </TouchableOpacity>
                <Text style={[styles.text, {color:'black', alignItems:'center'}]}>16</Text>
                <Octicons style={{ paddingLeft: 5 }} name="comment" size={24} color="black" />
               
                <View style={{ flexDirection: "row", flex:1, paddingLeft: 8, justifyContent:'space-evenly', alignItems:'center' }}>
                    
                    
                    <Text style={styles.text}>Rumour 1</Text>
                    <Text style={styles.text}>Authentic 1</Text>
                    
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
        fontSize: 18,
        color: "black",
        fontFamily: 'OldStandardTT-Regular'

    },
    text:{
        fontFamily: 'OldStandardTT-Regular'
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 16
    }

});