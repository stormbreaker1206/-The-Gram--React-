import React, { Component } from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native'
import {List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';
import moment from "moment";
import {deleteNotification, viewNotification} from '../../helpers/firebaseHelpers'
import {Swipeable} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

 NotificationList = ({item, navigation})=>{

  const highlightView = (item) => {

    if(item.postId != false){

      navigation.navigate('Comment', {id: item.postId})

    if(item.read != true){
      viewNotification(item.key)
    }

    }else{
      
      viewNotification(item.key)
    
  }
  
  }
 
  rightActions = (dragX, key)=>{

    const scale = dragX.interpolate(
      {
        inputRange: [-100, -20, 0],
        outputRange: [1, 0.9, 0],
        extrapolate: "clamp"
      }
    )

    const opacity = dragX.interpolate(
      {
        inputRange: [-100, 0],
        outputRange: [1, 0.9],
        extrapolate: "clamp"
      }
    )

    return(
      <TouchableOpacity onPress={()=>deleteNotification(key)}>
        <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
          <Animated.Text style={{transform:[{scale}]}}>
             <Ionicons name='ios-trash' color='white' size={32}/>
          </Animated.Text>

        </Animated.View>
      </TouchableOpacity>
    )

  }

    
    return (

     <Swipeable  renderRightActions={(_, dragX)=>rightActions(dragX, item.key)}>
      
          <List style={{backgroundColor: item.read == false ? '#e0e0e0' : null}}>
            <ListItem  avatar >
              <Left>
                <Thumbnail source={{ uri: item.userImage }} />
              </Left>
              <TouchableOpacity onPress={()=>highlightView(item)}>
              <Body style={{marginTop:15}}>
                <Text style={styles.text}>{item.fromWhom}</Text>
                <Text style={styles.text} note>{item.comments}</Text>
              </Body>
              </TouchableOpacity>
              <Right>
                <Text style={styles.text} note>{moment(item.timePosted).fromNow()}</Text>
              </Right>
            </ListItem>
            

            
          </List>
          
          </Swipeable>
         
    );
  
}

export default NotificationList

const styles = StyleSheet.create({
  text:{
   
    fontFamily: 'OldStandardTT-Regular',
    color: 'black'

},
deleteButton:{
  flex:1,
  backgroundColor:'red',
  justifyContent:'center',
  alignItems:'center',
  width: 80
},

read:{
  backgroundColor:'#e0e0e0',
}

})