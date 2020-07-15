import React from "react";
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import moment from "moment";
import {Video} from "expo-av";
import {connect} from 'react-redux';
import {checkLikes, checkAuthenticCount, checkRumourCount, checkCommentsCount, checkLikesCount, ifRumourExist, ifAuthenticExist} from "../../helpers/userUtilis";
import { compose } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import {getUserPost, updateLike, isRumour, isAuthentic} from '../../helpers/firebaseHelpers';
import VideoPlayer from '../VideoComponent/Video';
import ImageView from '../ImageComponent/Image.jsx';

let authCountNumber = 0

class PostComponent extends React.Component{
    constructor(props){
        super(props);

        this.state={

                postData: [],
                isVisible: false,
                selectedItem: [],
                likeStatus: false,
                liked: 'ios-heart-empty',
                likedCColor: 'black',
                uid: null,
                playVideo: true,
                postId: null,
                imageLoaded:null,
               

        }

    }

          
     settings = (item, id, isRumourExist, isAuthenticExist)=>{
        const options = [isRumourExist, isAuthenticExist,  'Cancel'];
        const cancelButtonIndex = 2;


        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected

                if(buttonIndex == 0){

                    isRumour(item, id).then(res=>{


                    })

                }else if(buttonIndex == 1){
                    isAuthentic(item, id).then(res=>{

                    })

                }
            },
        );
    }
    


    componentDidMount = () =>{

        Promise.all([
            this.setState({uid: this.props.user.uid}),
           // this.getLikePosts(),

        ]);


    }




    redirectToUserProfile = (item) =>{
        // this.props.navigation.navigate('MyProfile', {id : id})
         // console.log(item)
       //  this.props.profile

         
     }


    viewProfile =  async (id) => {


        if(this.state.uid === id){

            this.props.navigation.navigate('MyProfile')
        }else {

            await getUserPost(id).then(res=>{

                this.props.userPost(res)
            })

             this.props.navigation.navigate('UserProfile', {id : id, screen: 'HomeTabNavigator'})
        }
    }

    renderPost = ({item}) => {

      // const authCount = checkAuthenticCount(item)
      //  let test = authCount
      //console.log(item)


        const isRumourExist = ifRumourExist(item, this.state.uid)
        const isAuthenticExist = ifAuthenticExist(item, this.state.uid)
        const userlike = checkLikes(item, this.state.uid);
        let userLikedPost = '';
        let iconColor = '';
        if(userlike[0] === this.state.uid){
             userLikedPost = 'ios-heart';
             iconColor = '#90949c'
        }else{
             userLikedPost = 'ios-heart-empty';
             iconColor = 'black';
        }
       

          return (

            
                  <View style={styles.feedItem}>


                      <View>

                          <View style={{ flex: 1 }}>

                              <TouchableOpacity onPress={()=>this.viewProfile(item.id)}>

                                  <View style= {{flexDirection: "row", alignItems: "center" , padding:10}}>
                                      <Image source={{uri: item.proPic}} style={styles.avatar} />
                                      <Text style={styles.name}>{item.name}</Text>
                                  </View>
                              </TouchableOpacity>
                              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft:12, paddingRight:10 }}>
                                  <View>

                                      <Text style={styles.timestamp}>{moment(item.time).fromNow()}</Text>
                                  </View>
                                  <TouchableOpacity onPress={()=>this.settings(item, this.state.uid, isRumourExist, isAuthenticExist)}>
                                      <Ionicons name="ios-more" size={24} color="#73788B" />
                                  </TouchableOpacity>

                              </View>
                              {item.type === "text" ? (
                                  <Text style={styles.post}>{item.status}</Text>

                              ): (
                                  <View>
                                      <Text style={styles.post}>{item.status}</Text>
                                      {item.type === "video" ? (

                                        <VideoPlayer item={item.image}/>

                                      ): (
                                        <ImageView item={item.image} postItem={item} itemKey={item.key} userLikedPost={userLikedPost}/>

                                      )}
                                  </View>

                              )}

                              <View style={{flex:1}}>       
                                  <View style={{ flexDirection: "row", paddingLeft: 8 }}>
                                      <Text style={[styles.text, {color:'black', alignItems:'center'}]}>{checkLikesCount(item)}</Text>
                                      <TouchableOpacity onPress={()=> updateLike(item, this.state.uid)}>
                                          <Ionicons name={userLikedPost} size={24} color={iconColor} style={{paddingLeft:5, marginRight: 16 }} />
                                      </TouchableOpacity>
                                      <Text style={[styles.text, {color:'black', alignItems:'center'}]}>{checkCommentsCount(item)}</Text>
                                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comment', {id : item.key,
                                        userPostID: item.id})}>
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


        );
    };

    render() {
    
        return (
            <View style={styles.container}>

                <FlatList

                    data={this.props.data}
                    renderItem={this.renderPost}
                    keyExtractor={post => post.key}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
}


const mapDispatchToprops = dispatch =>{
    return{

        userPost: data => dispatch({type:'GET_POST', payload:data}),


    }

}


const wrapper = compose(
    connect(null, mapDispatchToprops),
    connectActionSheet
  );


export default wrapper (PostComponent)

const styles = StyleSheet.create({

    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
       // padding: 8,

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
    }
   


});