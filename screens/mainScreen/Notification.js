import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import NotificationList from '../../components/Notification/NotificationList.jsx'

 Notification = ({currentUserNotification, navigation})=>{
 
  
       
        return(
            <ScrollView style={style.container} >


                    {currentUserNotification.map((posts) =>{
                            return  (
                               
                               
                                <NotificationList navigation={navigation} item={posts} key={posts.key}/>
                                
                                
                            );

                        })}

               
            </ScrollView>
        )
    
}

const mapStateToProps = ({auth: {currentUserNotification}}) => ({
    currentUserNotification
    
  
})

export default connect(mapStateToProps) (Notification)

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
        
    }
})