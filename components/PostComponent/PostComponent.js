import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import moment from "moment";
import {Video} from "expo-av";
import {connect} from 'react-redux';
import ImageModalView from "../ImageModalComponent/ImageModalView";
import ProfileImageModal from '../ProfileImageModal/ProfileImageModal';
import {checkLikes} from "../../helpers/userUtilis";
import {updateLike} from "../../helpers/firebaseHelpers";
import { compose } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';


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
                viewProifle: false
        
        }

    }

    
     settings = ()=>{
        const options = ['Mark as Rumour ', 'Mark as Authentic', 'Report', 'Cancel'];
        const cancelButtonIndex = 3;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected

                if(buttonIndex == 0){
                    alert('mark as rumour')
                  //  this.openImageLibrary()
                }else if(buttonIndex == 1){
                   // this.openCamera()
                   alert('marked as authentic')
                }else if(buttonIndex == 2){
                    alert('reported')
                }
            },
        );
    }
    
   
  

    componentDidMount = async () =>{
  
      this.setState({uid: this.props.auth.currentUser.uid})

    }
    

    redirectToUserProfile = (item) =>{
        // this.props.navigation.navigate('MyProfile', {id : id})
         // console.log(item)
       //  this.props.profile

         
     }

  
   
    openImageModal = async (item) => {
 
             
       await this.setState({selectedItem: item})
        const open = this.state.isVisible
        if(this.state.isVisible){
            this.setState({isVisible: !open})
        }else {
            this.setState({isVisible: !open})
        }
    }

     viewProifle = () => {
              
   
        const open = this.state.viewProifle
        if(this.state.viewProifle){
            this.setState({viewProifle: !open})
        }else {
            this.setState({viewProifle: !open})
        }
    }

    renderPost = ({item}) => {

    
           

        const userlike = checkLikes(item, this.state.uid);
        let userLikedPost = '';
        let iconColor = '';
        if(userlike[0] === this.state.uid){
             userLikedPost = 'ios-heart';
             iconColor = '#BD0ADA'
        }else{
             userLikedPost = 'ios-heart-empty';
             iconColor = 'black';
        }
       
     //console.log(userlike)

   

          return (

            
              
            <View style={styles.feedItem}>

                 <ProfileImageModal onPress={this.viewProifle} viewProifle={this.state.viewProifle}/>
                
                <ImageModalView isVisible={this.state.isVisible} userLikedPost={userLikedPost} selectedItem={this.state.selectedItem} onPress={this.openImageModal}/>
              <View>

                <View style={{ flex: 1 }}>

                    <TouchableOpacity onPress={this.viewProifle}>

                    <View style= {{flexDirection: "row", alignItems: "center" }}>
                    <Image source={{uri: item.proPic}} style={styles.avatar} />
                    <Text style={styles.name}>{item.name}</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>

                            <Text style={styles.timestamp}>{moment(item.time).fromNow()}</Text>
                        </View>
                        <TouchableOpacity onPress={this.settings}>
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
                                <TouchableOpacity onPress={() =>this.openImageModal(item)}>
                               <Image loadingIndicatorSource={{uri: 'https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40'}}
                                source={{uri: item.image}} style={styles.postImage} resizeMode="cover" />
                                </TouchableOpacity>
                            )}
                        </View>

                    )}

                    <View style={{flex:1}}>
                    <View style={{ flexDirection: "row", paddingLeft: 8 }}>
                    <Text style={[styles.text, {color:'black', alignItems:'center'}]}>1</Text>
                        <TouchableOpacity onPress={()=> updateLike(item, this.state.uid)}>
                        <Ionicons name={userLikedPost} size={24} color={iconColor} style={{paddingLeft:5, marginRight: 16 }} />
                        </TouchableOpacity>
                        <Text style={[styles.text, {color:'black', alignItems:'center'}]}>16</Text>
                        <Octicons style={{ paddingLeft: 5 }} name="comment" size={24} color="black" />
                        
                        <View style={{ flexDirection: "row", flex:1, paddingLeft: 8, justifyContent:'space-evenly', alignItems:'center' }}>
                            
                            <Text style={styles.text}>16 Rumour</Text>
                            <Text style={styles.text}>1 Authentic</Text>
                            
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

                    data={this.props.data.reverse()}
                    renderItem={this.renderPost}
                    keyExtractor={post => post.key}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
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


export default wrapper (PostComponent)

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