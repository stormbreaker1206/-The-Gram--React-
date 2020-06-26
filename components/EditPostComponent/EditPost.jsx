import React from "react";
import {Image, View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {Body, Button, Container, Content, Footer, FooterTab, Header, Left, Right, Input} from "native-base";
import {Video} from "expo-av";
import {connect} from 'react-redux';
import LoadingView from '../LoadingIndicator/LoadingView';
import {updatePost} from '../../helpers/firebaseHelpers'
import VideoPlayer from '../VideoComponent/Video'
class EditUserPost extends React.Component{
    state = {
        comments: '',
         imageLoaded:null,
         status: this.props.item.status
    }

    updateUserPost = async (comment) =>{
        const post = updatePost(this.props.item.key, comment)
        await  this.props.onPress()

    }

  
    render() {
 
        return(
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.isVisible}

                >

                       <Container style={{flex:1 }}>
                                    <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                                        <Left>
                                            <TouchableOpacity
                                                onPress={this.props.onPress}
                                            >
                                              <Text style={{fontFamily: 'OldStandardTT-Regular',
                                                fontSize: 20}}>Cancel</Text>
                                            </TouchableOpacity>
                                        </Left>
                                        <Body>
                                            <Text style={{fontFamily: 'OldStandardTT-italic',
                                                fontSize: 20}}>Edit Gram</Text>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity onPress={()=>this.updateUserPost(this.state.status)}>
                                            <Text style={{fontFamily: 'OldStandardTT-Regular',
                                                fontSize: 20}}>Done</Text>
                                            </TouchableOpacity>
                                        </Right>
                                    </Header>
                                    
                                    <Content>

                                    <View style ={styles.container}>

                                        <Image source={{uri: this.props.currentUserData.image}} style={styles.avatar}></Image>

                                        <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>{this.props.currentUserData.handle}</Text>

                                       

                                    </View>
                                   
                                    <View style={{flexDirection:'row', marginLeft: 32}}>
                                        <TextInput onChangeText={(text)=> this.setState({status: text})} 
                                       // onEndEditing={(text) => {this.refs.body.focus()}}
                                       // autoFoucs={this.props.isVisible} 
                                        multiline={true} 
                                        numberOfLines={4}
                                        placeholder="What's the latest?"
                                         style={{flex:1, fontSize: 16, fontFamily: 'OldStandardTT-Regular'}} 
                                         value={this.state.status}
                                         >
                                           
                                         </TextInput>
                                        </View>
                                       
                                        <View style={styles.imageContainer}>

                                        {this.props.item.type === "video" ? (

                                       <VideoPlayer item={this.props.item.image}/> 
                                       
                                        ): (
                                        <View>
                                        <Image 
                                            source={this.props.item.image ? {uri: this.props.item.image } : null} style={styles.displayImage} resizeMode="cover"
                                            onLoadStart={()=>this.setState({imageLoaded:true})}
                                                      onLoadEnd={()=>this.setState({imageLoaded:false})}
                                            />
                                            {this.state.imageLoaded && <LoadingView/>}
                                            </View>
                                        )}
                                        </View>

                                        
                                    </Content>
                                                              
                                    </Container>

                                    

                </Modal>
            </View>
        )
    }

}

const mapStateToProps = ({auth: {currentUser, currentUserData}}) => ({
    currentUser,
    currentUserData



})

export default connect(mapStateToProps) (EditUserPost)


const  styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        height:700,
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        fontFamily: "OldStandardTT-Regular",
        color: "#52575D"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    containerInput:{
        flex:1
    },
    container:{
        margin:32,
        flexDirection:"row"
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,


    },
    photo:{
        alignItems: "flex-end",
        marginHorizontal:32
    },
    imageContainer:{
        marginTop:32,
        height:300,

    },
    displayImage:{
        width:'100%',
        height:'100%'

    }

})