import React from "react";
import {Image, StyleSheet, Text, View, TouchableWithoutFeedback} from "react-native";
import {Card,CardItem,Left, Right,} from "native-base";
import {checkBlock} from "../../helpers/userUtilis";
import {AntDesign, Octicons, FontAwesome5} from "@expo/vector-icons";
import {connect} from 'react-redux';
import {getUserPost} from "../../helpers/firebaseHelpers";

const CardList = ({item, currentUser, navigation, userPost})=>{
    const block = checkBlock(item, currentUser.uid)
    const userProfile = (id)=>{
        getUserPost(id).then(res=>{
            userPost(res)
        })
        navigation.navigate('UserProfile', {id: item.key,
        screen: 'Friends'})
    }

    return(
            <View>
            {item.key === currentUser.uid ? (null) : (

                <View>

                    {block[0] == currentUser.uid ? (
                        <Card>
                            <CardItem style={{padding:8}} cardBody>
                                <Image source={{uri: item.image}} style={styles.avatar}/>
                                <Left>
                                    <Text style={{fontFamily: 'OldStandardTT-Regular'}}>{item.handle}</Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={{paddingLeft:5, color:'red',fontFamily: 'OldStandardTT-Regular'}}>You are blocked</Text>

                                </Left>
                                <Right>

                                    <AntDesign style={{paddingLeft: 5}} name="lock" size={24} color="black" />

                                </Right>

                            </CardItem>

                        </Card>


                    ): (

                        <Card>
                            <CardItem style={{padding:8}} cardBody>
                                <Image source={{uri: item.image}} style={styles.avatar}/>
                                <Left>
                                <TouchableWithoutFeedback onPress={()=>userProfile(item.key)}>
                                    <Text style={{fontFamily: 'OldStandardTT-Regular'}}>{item.handle}</Text>
                                </TouchableWithoutFeedback>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>

                                    <Text style={{fontFamily: 'OldStandardTT-Regular'}}>Status:</Text>
                                    <Text style={{paddingLeft:5, color:'green',fontFamily: 'OldStandardTT-Regular'}}>Active</Text>
                                    <FontAwesome5 style={{paddingLeft: 5}} name="heartbeat" size={24} color="black" />

                                </Left>

                                <Right>
                                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Chat', {id: item.key})}>
                                        <Octicons name="comment" size={24} color="black" />
                                    </TouchableWithoutFeedback>
                                </Right>
                            </CardItem>

                        </Card>
                    )}

                </View>


                )}

            </View>

    )
}

const mapDispatchToprops = dispatch =>{
    return{

        userPost: data => dispatch({type:'GET_POST', payload:data}),


    }

}

const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,


})
export default connect(mapStateToProps, mapDispatchToprops) (CardList)


const styles = StyleSheet.create({
    avatar:{
        marginTop:5,
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,

    }
})