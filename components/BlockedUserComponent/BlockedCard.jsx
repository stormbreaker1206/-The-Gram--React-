import React from "react";
import {Image, StyleSheet, Text, View, TouchableWithoutFeedback} from "react-native";
import {Card,CardItem,Left, Right,} from "native-base";
import {checkBlock} from "../../helpers/userUtilis";
import {AntDesign, Octicons, FontAwesome5} from "@expo/vector-icons";

const BlockedCard = ({item})=>{


    return(

                        <Card>
                            <CardItem style={{padding:8}} cardBody>
                                <Image source={{uri: item.image}} style={styles.avatar}/>
                                <Left>
                                    <Text style={{fontFamily: 'OldStandardTT-Regular'}}>{item.handle}</Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={{paddingLeft:5, color:'red',fontFamily: 'OldStandardTT-Regular'}}>Blocked</Text>

                                </Left>
                                <Right>

                                    <AntDesign style={{paddingLeft: 5}} name="lock" size={24} color="black" />

                                </Right>

                            </CardItem>

                        </Card>

    )
}

export default BlockedCard


const styles = StyleSheet.create({
    avatar:{
        marginTop:5,
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,

    }
})