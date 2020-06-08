import React, {Component, useState} from "react";
import {Overlay} from "react-native-elements";
const {height}= Dimensions.get('window');
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {Container, Left, Right, Body, Header, Content, Footer, Item, Input, Spinner} from "native-base";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const CommentModal = ({modalVisible, onPress}) => {
    const [buttonVisible, setButtonVisible] = useState('');
     return (


         <Overlay overlayStyle={styles.modalView} onBackdropPress={onPress}  animationType="slide"   isVisible={modalVisible}>

                        <Container>
                         <Header androidStatusBarColor="#000000" style={{backgroundColor: "white"}}>
                             <Left>

                             </Left>

                             <Body>
                                 <Text style={{
                                     fontFamily: 'OldStandardTT-italic',
                                     textAlign:'center',
                                     fontSize: 20
                                 }}>Comments</Text>
                             </Body>
                             <Right>
                                 <TouchableOpacity onPress={onPress}>
                                     <Ionicons color='black' style={{paddingRight: 10}} name="ios-close-circle-outline"
                                               size={24}/>
                                 </TouchableOpacity>
                             </Right>
                         </Header>

                         <Content>
                             <Text>hi</Text>
                         </Content>

                         <View style={{ justifyContent: "center",
                             alignItems: "center"}}>
                             <View style={styles.SquareShapeView}/>
                         </View>


         </Container>

         </Overlay>


    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
       alignItems: "center",
       // marginTop: 22
    },
    modalView: {
        // margin: 20,

        position: 'absolute',
        left: 0,
        top: Platform.OS === 'ios' ? 30 : 0,
        height: 445,
        width: '100%',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

     container: {
        flex: 1,
         padding:5,
       flexDirection: "row",
        justifyContent: 'space-between',
        height: 55,
        marginTop: 10
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginLeft: 5,

    },
    SquareShapeView: {
       // position:'absolute',
        //marginTop:22,
        //zIndex:1,
        top:20,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',

        transform: [
            {rotate: '180deg'}
        ]
    },
    text:{
        fontSize:14,
        fontFamily: 'OldStandardTT-Regular'
    }


});


export default CommentModal;
