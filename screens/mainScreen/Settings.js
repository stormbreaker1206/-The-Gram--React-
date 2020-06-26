import React from 'react';
import * as firebase from 'firebase/app';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    TouchableWithoutFeedback, Alert
} from 'react-native';
import {
    privacySettings,
    DirectMessage,
    AllowNotification,
    AutoDelete,
    deleteAllPost, deleteUser
} from "../../helpers/firebaseHelpers";
import {checkBlockCount} from "../../helpers/userUtilis";
import {connect} from 'react-redux';
import {Body, Button, Container, Content,  Icon, Left, ListItem, Right, Switch} from "native-base";
import {EvilIcons, FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
class Settings extends React.Component{
    _isMounted = false;
    state={
        directMessage: null ,
        notification: null,
        profilePrivacy: null,
        autoDelete: null,


    }

    componentDidMount() {


        this._isMounted = true;

        if (this._isMounted) {
            this.setState({
                directMessage: this.props.currentUserData.directMessage,
                notification: this.props.currentUserData.notification,
                profilePrivacy: this.props.currentUserData.profilePrivacy,
                autoDelete: this.props.currentUserData.autoDelete,


            })

        }
    }

    createTwoButtonAlert = () =>
        Alert.alert(
            "Message",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: this.deactivateAccount

                }
            ],
            { cancelable: false }
        );
componentWillUnmount() {

    this._isMounted = false;
}

    deactivateAccount = async ()=>{

      let user = firebase.auth().currentUser;
        await deleteAllPost(this.props.currentUser.uid)
        await deleteUser(this.props.currentUser.uid)

        user.delete().then(function() {
            this.props.signOutUser()
        }).catch(function(error) {
            // An error happened.
        });

    }

    changePrivacy = async (id, options)=>{
       await this.setState({profilePrivacy: !this.state.profilePrivacy})
       await privacySettings(id, options)

    }

    changeMessageSettings = async (id, message)=>{
        await this.setState({directMessage: !this.state.directMessage})
        await DirectMessage(id, message)

    }
    changeNotificationSettings = async (id, status)=>{
        await this.setState({notification: !this.state.notification})
        await AllowNotification(id, status)

    }

    turnOnAutoDelete = async (id, options) =>{
        await this.setState({autoDelete: !this.state.autoDelete})
        await AutoDelete(id, options)
    }


    signOut = async () => {
        try {
            await firebase.auth().signOut();
            await this.props.signOutUser()

        } catch (error) {
            alert('Unable to sign out right now');
        }
    };
    render() {
        const bUsers = checkBlockCount(this.props.currentUserData)
        return(
            <Container>

                <Content>
                    {/*}  <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <AntDesign name="contacts" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Change Username</Text>
                        </Body>


                    </ListItem> */}
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="autorenew" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Auto Delete Chat</Text>
                        </Body>
                        <Right>
                            <Switch onValueChange={()=>this.turnOnAutoDelete(this.props.currentUser.uid, this.state.autoDelete)}  value={this.state.autoDelete} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="chat-bubble-outline" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Allow Direct Chat</Text>
                        </Body>
                        <Right>
                            <Switch onValueChange={()=>this.changeMessageSettings(this.props.currentUser.uid, this.state.directMessage)} value={this.state.directMessage} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <AntDesign name="lock" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Profile Privacy</Text>
                        </Body>
                        <Right>
                            <Switch onValueChange={()=>this.changePrivacy(this.props.currentUser.uid, this.state.profilePrivacy)} value={this.state.profilePrivacy} />
                        </Right>

                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Allow Notifications</Text>
                        </Body>
                        <Right>
                            <Switch onValueChange={()=>this.changeNotificationSettings(this.props.currentUser.uid, this.state.notification)} value={this.state.notification} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="block" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Blocked Users</Text>
                        </Body>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('BlockedUsers')}>
                        <Right>
                            <Text style={style.textStyle}>{bUsers} Users</Text>
                            <Icon active name="arrow-forward" />
                        </Right>
                        </TouchableOpacity>
                    </ListItem>

                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="library-books" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={style.textStyle}>Data Policy</Text>
                        </Body>
                        <Right>

                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="library-books" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>

                            <Text style={style.textStyle}>Terms of Use</Text>

                        </Body>
                        <Right>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('TermOfUse')}>
                            <Icon active name="arrow-forward" />
                        </TouchableWithoutFeedback>
                        </Right>
                    </ListItem>
                    {/*} <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <EvilIcons name="close-o" size={32} color="black" />
                            </Button>
                        </Left>
                        <Body>

                            <Text style={style.textStyle}>Deactivate</Text>

                        </Body>
                        <Right>
                            <Switch onValueChange={this.createTwoButtonAlert}  value={false} />
                        </Right>
                    </ListItem>
                    */}

                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <FontAwesome name="sign-out" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableWithoutFeedback onPress={this.signOut}>


                            <Text style={style.textStyle}>Sign Out</Text>
                            </TouchableWithoutFeedback>
                        </Body>

                    </ListItem>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({auth: {currentUser, currentUserData}}) => ({
    currentUser,
    currentUserData,



})
const mapDispatchToprops = dispatch =>{
    return{

        signOutUser: () => dispatch({type: 'SIGN_OUT'}),


    }

}

export default connect(mapStateToProps, mapDispatchToprops)(Settings)

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listStyle:{
        marginTop:15,
        marginBottom:10
    },
    textStyle:{
        fontFamily: 'OldStandardTT-Regular'
    }
})