import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Dimensions} from 'react-native';
import {Ionicons, Octicons} from "@expo/vector-icons";
import {checkAuthenticCount, checkRumourCount, checkLikesCount, checkCommentsCount} from "../../helpers/userUtilis";
import {snapshotToArray, updateLike} from "../../helpers/firebaseHelpers";
import CommentModal from "../Comment/CommentModal";
import * as firebase from "firebase";
const {width}= Dimensions.get('window');

class LightBoxView extends React.Component {

state ={
    modalVisible: false,
    data: []

}
componentDidMount() {
   this.getComment()

}

    getComment = async () => {
        try {

            const comments = await firebase.
            database()
                .ref('comment').orderByChild('postId');
            comments.once('value',  (snapshot) => {
                const postArray = snapshotToArray(snapshot)
                let list = postArray.filter(x => x.postId === this.props.postId)
                this.setState({data: list.reverse()})

            });

        }catch (e) {
            console.log(e)
        }

    }


    viewCommentModal = ()=>{

        this.setState({modalVisible: !this.state.modalVisible})


        }

        render(){
            const {item, userLikedPost, user} = this.props


    return (

        <View style={{flex: 1, justifyContent: 'center'}}>
            <View>
                <CommentModal modalVisible={this.state.modalVisible} data={this.state.data}  onPress={this.viewCommentModal}/>
            </View>
            <Image source={{uri: item.image}} style={styles.postImage} resizeMode="cover"/>
            <View style={{flexDirection: "row", paddingLeft: 8, zIndex:1}}>
                <Text style={[styles.text, {color: 'white', alignItems: 'center'}]}>{checkLikesCount(item)}</Text>
                <TouchableOpacity onPress={()=>updateLike(item, user)}>
                    <Ionicons name={userLikedPost} size={24} color='#e9ebee' style={{paddingLeft: 5, marginRight: 16}}/>
                </TouchableOpacity>
                <Text style={[styles.text, {color: 'white', alignItems: 'center'}]}>{checkCommentsCount(item)}</Text>
                <TouchableOpacity  onPress={this.viewCommentModal}>
                    <Octicons style={{paddingLeft: 5}} name="comment" size={24} color="white"/>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", flex:1, marginLeft:80, paddingLeft: 8, paddingBottom:5, justifyContent:'space-evenly', alignItems:'center', }}>

                    <Text style={[styles.text, {color: 'white'}]}>{checkRumourCount(item)} Rumour</Text>

                    <Text style={[styles.text, {color: 'white'}]}>{checkAuthenticCount(item)} Authentic</Text>

                </View>



            </View>


        </View>
    )

}


}


export default LightBoxView;

const styles = StyleSheet.create({

    text: {
        fontFamily: 'OldStandardTT-Regular'
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 16,



    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'transparent',
        width: width
    }

});
