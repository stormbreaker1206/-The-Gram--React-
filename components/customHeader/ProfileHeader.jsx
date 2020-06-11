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

    test = async (downloadUrl)=>{
        await firebase.database().ref('posts').orderByChild('id').equalTo(this.props.auth.currentUser.uid)
            .on('value' , (snapshot)=>{
                //console.log(snapshot.val())
                if(snapshot.exists()){
                    snapshot.forEach(function (snapshot1) {

                        firebase.database().ref('posts').child(snapshot1.key)
                            .update({proPic: downloadUrl })


                    })
                }
            })
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

                    await this.test(downloadUrl)

            
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
                <View style={styles.wallerPaper}>
                    <Image source={{uri: this.props.auth.currentUserData.image}} resizeMode='cover' style={{width:'100%', height:200}}/>
                </View>
                <TouchableOpacity onPress={this.openImageLibrary}>
                <View style={styles.imageContainer}>
                    <View style={styles.check}>

                        <Ionicons name="ios-camera" size={24} color="black" />

                    </View>

                    {this.state.isLoading ? (
                        <Spinner color='#BD0ADA' />
                
                    ): (   <View>

                       

                        {this.props.auth.currentUserData.image ? (
                            <Image source={{uri: this.props.auth.currentUserData.image }} style={styles.circleImage}/>
                        ): (
                        <Image source={require('../../assets/white-bg.jpg')} style={styles.circleImage}></Image>
                        )}
     
                     </View>)}
                    
                   
                </View>
                </TouchableOpacity>
                <View>

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
        zIndex: 5,
        right: 125,
        bottom: 0
         
        
    },
    text: {
        fontFamily: "OldStandardTT-Regular",
        color: "black",
        fontSize:18
    },
    wallerPaper:{
        flex:1, justifyContent: 'center', margin:12,
        alignItems: 'center',
        overflow:"hidden",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    circleImage:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        borderColor: 'white',
        borderWidth:5,
        right: -67,
    }



});
