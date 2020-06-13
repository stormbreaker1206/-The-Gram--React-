import React from "react";
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform, ScrollView
} from "react-native";
import {Container, Icon, Left, Right, Body, Header, Content, Footer, Item, Input, Spinner} from "native-base";
import {Ionicons, } from "@expo/vector-icons";
import * as firebase from "firebase";
import { GiftedChat, Bubble, Composer, InputToolbar   } from 'react-native-gifted-chat'
import {oneToOneChat, oneToOneSender, snapshotToArray} from "../../helpers/firebaseHelpers";
class Chat extends React.Component{
    state={
        id: this.props.route.params.id,
        screen: this.props.route.params.screen,
        data: {},
        isLoaded: false,
        messages: null
    }

   componentDidMount() {

       this.getUserInfo()
       this.getData()
   }

    renderComposer = (props) => (
        <Composer
            {...props}
            textInputStyle={{
               borderRadius: 5,
               marginLeft: 0,
               fontFamily: "OldStandardTT-Regular"
            }}
        />
    );

   getData = async ()=>{
        try {

            const data = await firebase.database().ref('messages').child(this.state.id).child(this.props.currentUser.uid);
           // let result = ''
            data.on('value', (snapshot)=>{
                const results = snapshotToArray(snapshot)
                this.setState({messages: results})

              })



        }catch (e) {
            console.log(e)
        }
   }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        oneToOneChat(this.state.id, this.props.currentUser.uid, messages).then(res=>{
            oneToOneSender(this.props.currentUser.uid,this.state.id, messages)
            }
        )
    }

     customSystemMessage = props => {
        return (
            <View>
                <Icon name="lock" color="#9d9d9d" size={16} />
                <Text>
                    Your chat is secured. Remember to be cautious about what you share
                    with others.
                </Text>
            </View>
        );
    };


    getUserInfo = async ()=>{

        this.setState({isLoaded:true})
       try {


           const currentUser = await  firebase.database().ref('users')
               .child(this.state.id).on('value', (snapshot)=>{
                   this.setState({data: snapshot.val(), isLoaded:false})
               })

       }catch (e) {
           console.log(e)
       }

   }

    render() {

        return(
            <View style={styles.container}>

                  <View>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                <Ionicons style={{padding:5, marginTop: 5}} color='black'  name="ios-arrow-back" size={32} />
                            </TouchableOpacity>

                            <View style={{flexDirection:'row', paddingLeft:10, justifyContent:'center', alignContent:'center'}}>

                                <Image source={{uri: this.state.data.image }}  style={styles.avatar}></Image>
                                <View style={{flexDirection:'column'}}>

                                    <Text style={styles.text}>{this.state.data.handle}</Text>

                                    <Text style={styles.status}>Active 12 min ago</Text>
                                </View>



                            </View>

                            <TouchableOpacity style={{position:'absolute', top:5, left:340}}  onPress={()=>this.props.navigation.goBack()}>
                                <Ionicons style={{padding:5, marginTop: 5}} name="ios-more" size={24} color="#73788B" />
                            </TouchableOpacity>

                        </View>




                        </View>

                <GiftedChat
                    inverted={false}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.props.currentUser.uid,
                        name: this.props.currentUserData.handle,
                        avatar: this.props.currentUserData.image,

                    }}

                    renderComposer={props =>this.renderComposer(props)}
                    messagesContainerStyle={{ backgroundColor: 'white' }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                i

                                textStyle={{
                                    right: {
                                        color: 'white',
                                        fontFamily: "OldStandardTT-Regular",


                                    },
                                    left: {
                                        color: '#73788B',
                                        fontFamily: "OldStandardTT-Regular",

                                    },

                                }}

                                wrapperStyle={{
                                    left: {
                                      marginTop:10
                                    },

                                }}

                            />
                        );
                    }}
                />

            </View>


        )
    }
}

const mapStateToProps = ({auth: {currentUser, currentUserData}}) => ({
    currentUser,
    currentUserData



})
export default connect(mapStateToProps)(Chat)

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'

     },
    inputText:{
        fontSize:14,
        fontFamily: 'OldStandardTT-Regular'


    },
    header:{
        height: 60,
        marginTop: 20,
        padding:10,
        paddingLeft:20,
        flexDirection:'row',
       // justifyContent:'space-between'

    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,
    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        color: "black",
        fontFamily: 'OldStandardTT-Regular',
        marginTop: 10
       // padding: 5

    },
    status:{
        fontSize: 12,
        color: "#C4C6CE",
        fontFamily: 'OldStandardTT-Regular'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    footer:{
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        height: 50,
        marginTop:10,

    }
})