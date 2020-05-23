import React from 'react';
import {StyleSheet, StatusBar, Text, View, Dimensions, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Spinner} from 'native-base'
import {Ionicons} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from 'react-redux';
import * as firebase from "firebase";
import 'firebase/storage';
import Header from '../customHeader/Header';
import {openImageLibrary, prepareBlob} from '../../helpers/ImageHelpers';
const screenWidth = Math.round(Dimensions.get('window').width);

class ProfileHeader extends React.Component{
    state={
        isLoading: false,
        screen: screenWidth,
        right: false

        
    }

    openImageLibrary = async () =>{
        
        const results = await openImageLibrary()
       
        if(results){

            if(results) {
                const downloadUrl = await this.uploadPost(results, this.props.auth.currentUser.uid);

            }
        }
    }

    uploadPost = async (image, id) => {
        //  this.setState({isLoading: true})
        this.setState({isLoading: true})
          const path = `users/${id}/${Date.now()}`
          const ref = firebase.storage().ref(path)
          try {
              const blob = await prepareBlob(image.uri)
              const snapshot = await ref.put(blob)
  
              let downloadUrl = await ref.getDownloadURL();
              
            
  
              await firebase
                  .database()
                  .ref('users').child(id)
                  .update({image: downloadUrl });
            
                  this.setState({isLoading: false})
              blob.close();
  
              return downloadUrl;
  
  
          }catch (e) {
              console.log(e)
          }
      }

  
    render(){
        return(
            
            <View style={{padding:5}}>
                
            <Header onPress={this.props.onPress} text={JSON.parse(JSON.stringify(this.props.auth.currentUserData.handle))} name='account-circle'/>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
         
       
                </View>

                <View style={styles.imageContainer}>
                    <View style={styles.check}>
                    <TouchableOpacity onPress={this.openImageLibrary}>
                        <Ionicons name="ios-camera" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                   
                    {this.state.isLoading ? (
                        <Spinner color='#BD0ADA' />
                
                    ): (   <View>

                       

                        {this.props.auth.currentUserData.image ? (
                            <Image source={{uri: this.props.auth.currentUserData.image }} style={styles.avatar}/>
                        ): (
                        <Image source={require('../../assets/white-bg.jpg')} style={styles.avatar}></Image>
                        )}
     
                     </View>)}
                    
                   
                </View>


            </View>

           
        )
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps) (ProfileHeader)


const styles = StyleSheet.create({
    
    avatar:{
        width:100,
        height:100,
        borderRadius:32,
        
    },
    imageContainer:{
        marginTop:16,
        justifyContent: 'center',
        flex:1,
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
    check:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 32,
        width: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.3,
        position: 'absolute',
        zIndex: 1,
        right: 125,
        bottom: 16
         
        
    },
    text: {
        fontFamily: "OldStandardTT-Regular",
        color: "black",
        fontSize:18
    },

    Follow:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'pink',
        borderRadius: 100,
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,
        

    },
    Followtext:{
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginLeft: 4
    }

});
