import React from 'react';
import {StyleSheet, StatusBar, Text, View, TextInput, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Content, Container,  Header, Left, Right,Button, Icon, Switch,Body, List, ListItem} from "native-base";
import {Ionicons, AntDesign, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const UserChatSettings = ({navigation})=> {


    return(

    <Container>
        <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
            <Left>
                <TouchableOpacity onPress={()=>navigation.goBack()}

                >
                    <Ionicons color='black' style={{paddingLeft:10}} name="ios-arrow-back" size={24} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Text style={{fontFamily: 'OldStandardTT-italic',
                    fontSize: 20}}>Chat Settings</Text>
            </Body>
            <Right>

            </Right>

        </Header>
        <Content>
            <ListItem style={style.listStyle} icon>
                <Left>
                    <Button style={{ backgroundColor: "white" }}>
                        <MaterialIcons name="autorenew" size={24} color="black" />
                    </Button>
                </Left>
                <Body>
                    <Text>Auto Delete</Text>
                </Body>
                <Right>
                    <Switch value={false} />
                </Right>
            </ListItem>
            <ListItem style={style.listStyle} icon>
                <Left>
                    <Button style={{ backgroundColor: "white" }}>
                        <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
                    </Button>
                </Left>
                <Body>
                    <Text>Delete Chat</Text>
                </Body>

            </ListItem>
            <ListItem style={style.listStyle} icon>
                <Left>
                    <Button style={{ backgroundColor: "white" }}>
                        <MaterialIcons name="block" size={20} color="black" />
                    </Button>
                </Left>
                <Body>
                    <Text>Block</Text>
                </Body>
                <Right>
                    <Text>Off</Text>
                    <Icon active name="arrow-forward" />
                </Right>
            </ListItem>
        </Content>
    </Container>
    )
}

export default UserChatSettings

const style = StyleSheet.create({
    header:{
        height: 60,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    listStyle:{
        marginTop:15,
        marginBottom:10
    }
})