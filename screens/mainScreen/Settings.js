import React from 'react';
import CustomButton from "../../components/customButtons/customButtons";
import * as firebase from 'firebase/app';
import {StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Body, Button, Container, Content, Header, Icon, Left, ListItem, Right, Switch} from "native-base";
import {EvilIcons, FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
class Settings extends React.Component{

    signOut = async () => {
        try {
            await firebase.auth().signOut();
            this.props.signOut()

        } catch (error) {
            alert('Unable to sign out right now');
        }
    };
    render() {
        return(
            <Container>

                <Content>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <AntDesign name="contacts" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Change Username</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="chat-bubble-outline" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Allow Direct Chat</Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <AntDesign name="lock" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Profile Privacy</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>

                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Allow Notifications</Text>
                        </Body>
                        <Right>
                            <Switch value={true} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <MaterialIcons name="block" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Blocked Users</Text>
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
                            <Text>Data Policy</Text>
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
                            <Text>Terms of Use</Text>
                        </Body>
                        <Right>

                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <EvilIcons name="close-o" size={32} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Deactivate</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem style={style.listStyle} icon>
                        <Left>
                            <Button style={{ backgroundColor: "white" }}>
                                <FontAwesome name="sign-out" size={24} color="black" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Sign Out</Text>
                        </Body>

                    </ListItem>
                </Content>
            </Container>
        )
    }
}
const mapDispatchToprops = dispatch =>{
    return{

        signOut: () => dispatch({type: 'SIGN_OUT'})
    }

}

export default connect(null, mapDispatchToprops)(Settings)

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listStyle:{
        marginTop:15,
        marginBottom:10
    }
})