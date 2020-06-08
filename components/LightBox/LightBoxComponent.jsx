import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Dimensions} from 'react-native';
import {Ionicons, Octicons} from "@expo/vector-icons";
import {checkAuthenticCount, checkRumourCount, checkLikesCount} from "../../helpers/userUtilis";
import {updateLike} from "../../helpers/firebaseHelpers";
import CommentModal from "../Comment/CommentModal";
const {width}= Dimensions.get('window');
const LightBoxView = ({item, userLikedPost, user}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [focus, setFocus] = useState(false);
    const inputRef = React.useRef()

        const viewCommentModal = ()=>{
            setModalVisible(!modalVisible)
            setFocus(!focus)

        }

    return (

        <View style={{flex: 1, justifyContent: 'center'}}>
           <View>
               <CommentModal modalVisible={modalVisible} focus={focus} onPress={viewCommentModal}/>
           </View>
            <Image source={{uri: item.image}} style={styles.postImage} resizeMode="cover"/>
            <View style={{flexDirection: "row", paddingLeft: 8, zIndex:1}}>
                <Text style={[styles.text, {color: 'white', alignItems: 'center'}]}>{checkLikesCount(item)}</Text>
                <TouchableOpacity onPress={()=>updateLike(item, user)}>
                    <Ionicons name={userLikedPost} size={24} color='white' style={{paddingLeft: 5, marginRight: 16}}/>
                </TouchableOpacity>
                <Text style={[styles.text, {color: 'white', alignItems: 'center'}]}>16</Text>
                <TouchableOpacity  onPress={viewCommentModal}>
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
