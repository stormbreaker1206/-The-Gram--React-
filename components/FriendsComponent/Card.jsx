import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Card,CardItem,Left, Right,} from "native-base";
import {Entypo, Octicons, FontAwesome5} from "@expo/vector-icons";
import {connect} from 'react-redux';
const CardList = ({item, currentUser})=>{
    return(
            <View>
            {item.key === currentUser.uid ? (null) : (
                <Card>
                <CardItem style={{padding:8}} cardBody>
                <Image source={{uri: item.image}} style={styles.avatar}/>
                <Left>
                <Text style={{fontFamily: 'OldStandardTT-Regular'}}>{item.handle}</Text>
                </Left>
                </CardItem>
                <CardItem>
                <Left>

                <Text style={{fontFamily: 'OldStandardTT-Regular'}}>Status:</Text>
                <Text style={{paddingLeft:5, color:'green',fontFamily: 'OldStandardTT-Regular'}}>Active</Text>
                <FontAwesome5 style={{paddingLeft: 5}} name="heartbeat" size={24} color="black" />

                </Left>

                <Right>
                <Octicons name="comment" size={24} color="black" />
                </Right>
                </CardItem>

                </Card>
                )}

            </View>

    )
}
const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,


})
export default connect(mapStateToProps) (CardList)


const styles = StyleSheet.create({
    avatar:{
        marginTop:5,
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,

    }
})