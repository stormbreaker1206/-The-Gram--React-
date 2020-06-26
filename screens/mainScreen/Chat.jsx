import React from "react";
import {connect} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import {Ionicons, } from "@expo/vector-icons";
import * as firebase from "firebase";
import { GiftedChat } from 'react-native-gifted-chat';
import {renderInputToolbar, renderComposer, renderBubble, renderSend} from "../../helpers/chatStyles";
import {
    oneToOneChat,
    oneToOneSender,
    deleteMessage,
    snapshotToArray
} from "../../helpers/firebaseHelpers";
import { compose } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
class Chat extends React.Component{
    _isMounted = false;
    state={
        id: this.props.route.params.id,
        data: {},
        isLoaded: false,
        messages: null,
        userChatSettings:null,
        autoDelete: null
    }

   componentDidMount() {
       this._isMounted = true;

       if (this._isMounted) {
           this.getUserInfo()
           this.getData()
           this.getUserSettings()
       }

   }

    _onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html

        const options = ['Delete Chat', 'Cancel'];

        const cancelButtonIndex = 1;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {

                if(buttonIndex == 0){

                    deleteMessage(this.props.currentUser.uid,this.state.id).then(res=>{
                        this.getData()
                    })

                }



                // Do something here depending on the button index selected
            },
        );
    };
componentWillUnmount() {
    this._isMounted = false;
}

    getUserSettings = ()=>{
      let list = this.props.settings.filter(x => x.id === this.state.id)
      let results = list.map(x => x.directMessage)
      this.setState({userChatSettings: results[0]})




   }

   onReturn = ()=>{
       this.props.navigation.navigate('Friends')
    if(this.props.currentUserData.autoDelete){
        deleteMessage(this.props.currentUser.uid,this.state.id)
    }

   }


   getData = async ()=>{
        try {

            const data = await firebase.database().ref('messages').child(this.props.currentUser.uid).child(this.state.id);
           // let result = ''
            data.once('value', (snapshot)=>{
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
        this.getData()
    }

    getUserInfo = async ()=>{

        this.setState({isLoaded:true})
       try {


           const currentUser = await  firebase.database().ref('users')
               .child(this.state.id).once('value', (snapshot)=>{
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
                            <TouchableOpacity onPress={this.onReturn}>
                                <Ionicons style={{padding:5, marginTop: 5}} color='black'  name="ios-arrow-back" size={32} />
                            </TouchableOpacity>

                            <View style={{flexDirection:'row', paddingLeft:10, justifyContent:'center', alignContent:'center'}}>

                                <Image source={{uri: this.state.data.image }}  style={styles.avatar}></Image>
                                <View style={{flexDirection:'column'}}>

                                    <Text style={styles.text}>{this.state.data.handle}</Text>

                                    <Text style={styles.status}>Active 12 min ago</Text>
                                </View>



                            </View>

                            <TouchableOpacity style={{position:'absolute', top:5, left:320}}  onPress={this._onOpenActionSheet}>
                                <Ionicons style={{padding:5, marginTop: 5}} name="ios-more" size={24} color="#73788B" />
                            </TouchableOpacity>

                        </View>




                        </View>


                {this.state.userChatSettings  ? (
                    <GiftedChat
                        inverted={false}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.props.currentUser.uid,
                            name: this.props.currentUserData.handle,
                            avatar: this.props.currentUserData.image,

                        }}
                        renderActions={this.renderActions}
                        renderComposer={props =>renderComposer(props)}
                        renderSend={renderSend}
                        messagesContainerStyle={{ backgroundColor: 'white',paddingBottom:20 }}
                        renderBubble={renderBubble}
                        renderInputToolbar={renderInputToolbar}

                    />
                ): (



                    <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                    <Text style={{textAlign: "center", fontFamily: 'OldStandardTT-Regular'}}>Direct message to this user is not allowed</Text>
                    </View>
                )}

            </View>


        )
    }
}

const mapStateToProps = ({auth: {currentUser, currentUserData}, userSettings:{settings}}) => ({
    currentUser,
    currentUserData,
    settings



});

const wrapper = compose(
    connect(mapStateToProps),
    connectActionSheet
);

export default wrapper(Chat);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    inputText: {
        fontSize: 14,
        fontFamily: 'OldStandardTT-Regular'


    },
    header: {
        height: 60,
        marginTop: 20,
        padding: 10,
        paddingLeft: Platform.OS == 'ios' ? 20 : 10,
        flexDirection: 'row',
        // justifyContent:'space-between'

    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        color: "black",
        fontFamily: 'OldStandardTT-Regular',
        marginTop: 10
        // padding: 5

    },
    status: {
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
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        height: 50,
        marginTop: 10

    }
})