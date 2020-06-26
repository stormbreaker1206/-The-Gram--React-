import React from 'react';
import { StyleSheet,Text, View,Image, Platform, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Container, Left, Right, Body, Header, Content, Footer, Item, Input, Spinner} from "native-base";
import {connect} from 'react-redux';
import {Ionicons} from "@expo/vector-icons";
import CommentFlatList from "../../components/Comment/CommentFlatList";
import {commentOnPost, snapshotToArray, updateComment} from "../../helpers/firebaseHelpers";
import {Overlay} from "react-native-elements";
import * as firebase from "firebase";
import {HeaderHeightContext} from "@react-navigation/stack";

class Comment extends React.Component{
    _isMounted = false;
    state={
        comments: '',
        showSpinner: false,
        texRef: null,
        postId: null,
        uid: null,
        image: null,
        handle: null,
        data: []
    }


    componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {
            this.getComment()

            this.setState({
                postId: this.props.route.params.id,
                uid: this.props.currentUser.uid,
                image: this.props.currentUserData.image,
                handle: this.props.currentUserData.handle
            })

        }
   }

   componentWillUnmount() {
       this._isMounted = false;
   }

    getComment = async () => {
        try {

            const comments = await firebase.
            database()
                .ref('comment').orderByChild('postId');
            comments.once('value',  (snapshot) => {
                const postArray = snapshotToArray(snapshot)
               let list = postArray.filter(x => x.postId === this.state.postId)
                this.setState({data: list.reverse()})


            });

        }catch (e) {
            console.log(e)
        }

    }



    redirect = () =>{
        this.props.navigation.goBack()
    }



    upLoadComment = async (postId, comments, uid, image, handle) =>{

        this.setState({ comments: '' });
        this.state.texRef.setNativeProps({ text: '' });
        // this.textInputRef.setNativeProps({ text: '' });
     // this.state.texRef.clear()
        this.setState({showSpinner:true})
        await updateComment(postId, uid)
        await commentOnPost(postId, comments, uid, image, handle).then(res =>{
          this.setState({showSpinner: false},()=> this.getComment())

       })

    }
render(){
    return(

        <View style={{flex:1, backgroundColor:'white'}}>
            <Overlay overlayStyle={{backgroundColor:'transparent'}} isVisible={this.state.showSpinner}>
                <Spinner color='#BD0ADA' />
            </Overlay>

            <KeyboardAvoidingView  keyboardVerticalOffset ={Platform.OS == "ios"? 0 : Header.HEIGHT + 10}   behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>

                <Container style={{flex:1 }}>
                    <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                        <Left>
                            <TouchableOpacity
                                onPress={this.redirect}
                            >
                                <Ionicons color='black' style={{paddingLeft:10}} name="ios-arrow-back" size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text style={{fontFamily: 'OldStandardTT-italic',
                                fontSize: 20}}>Comments</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={()=>this.upLoadComment(
                                this.state.postId,
                                this.state.comments,
                                this.state.uid,
                                this.state.image,
                                this.state.handle

                            )}>
                                <Ionicons color='black' style={{paddingRight:10}} name="ios-paper-plane" size={24} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content>


                        {this.state.data.map((posts) =>{
                            return  (

                                <CommentFlatList item={posts} key={posts.key}/>

                            );

                        })}


                    </Content>

                    <Footer style={{height:70, backgroundColor:'white'}}>

                        <View style ={styles.container}>

                            <Image source={{uri: this.props.currentUserData.image }} style={styles.avatar}></Image>

                            <Item rounded style={{width: 275}}>
                                <Input

                                    ref={ref => {
                                        this.state.texRef = ref ;
                                    }}
                                    onChangeText={text => this.setState({ comments: text })}
                                    placeholderTextColor='#c7c9d1'
                                    multiline={true}
                                    numberOfLines={4} style={styles.text}
                                    placeholder={`Comment as ${this.props.currentUserData.handle}`}/>

                            </Item>

                        </View>

                    </Footer>

                </Container>

            </KeyboardAvoidingView>

        </View>

    )
}



}

const mapStateToProps = ({auth: {currentUser, currentUserData}}) => ({
    currentUser,
    currentUserData,



})


export default connect(mapStateToProps) (Comment)

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        height: 50,
        marginTop:10,

    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,

    },

    text:{
        fontSize:14,
        fontFamily: 'OldStandardTT-Regular'


    },
    messageContainer:{
        flex: 1,
        justifyContent:'center',
        alignContent:'center'

    },
    messageText:{
        color:'black',
        textAlign:'center',
        fontFamily: 'OldStandardTT-Regular'
    }
})