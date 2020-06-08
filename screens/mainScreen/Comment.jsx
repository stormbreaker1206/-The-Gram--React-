import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import {Container, Left, Right, Body, Header, Content, Footer, Item, Input, Spinner} from "native-base";
import {connect} from 'react-redux';
import {Ionicons} from "@expo/vector-icons";
import CommentFlatList from "../../components/Comment/CommentFlatList";
import UserPost from "../../components/PostComponent/UserPost";
// temporary data until we pull from Firebase
let data = [
    {
        id: "1",
        name: "Joe McKay",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: 1569109273726,
        avatar: require("../../assets/profile-pic.jpg"),
        image: require("../../assets/profile-pic.jpg")
    },
    {
        id: "2",
        name: "Karyn Kim",
        text:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: 1569109273726,
        avatar: require("../../assets/user1.jpg"),
        image: require("../../assets/profile-pic.jpg")
    },
    {
        id: "3",
        name: "Emerson Parsons",
        text:
            "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
        timestamp: 1569109273726,
        avatar: require("../../assets/user2.jpg"),
        image: require("../../assets/profile-pic.jpg")
    },
    {
        id: "4",
        name: "Kathie Malone",
        text:
            "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
        timestamp: 1569109273726,
        avatar: require("../../assets/media1.jpg"),
        image: require("../../assets/profile-pic.jpg")
    }
];
const Comment = (props) => {
  const  redirect = () =>{
        props.navigation.navigate('HomeTabNavigator')
    }


        return(

            <View style={{flex:1, backgroundColor:'white'}}>

                <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
                <Container style={{flex:1 }}>
                    <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                        <Left>
                            <TouchableOpacity
                                onPress={redirect}
                            >
                                <Ionicons color='black' style={{paddingLeft:10}} name="ios-arrow-back" size={24} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text style={{fontFamily: 'OldStandardTT-italic',
                                fontSize: 20}}>Comments</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity>
                                <Ionicons color='black' style={{paddingRight:10}} name="ios-paper-plane" size={24} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content>

                        {data.map((posts) =>{
                            return  (

                                <CommentFlatList item={posts} key={posts.id}/>

                            );

                        })}


                    </Content>

                    <Footer style={{height:70, backgroundColor:'white'}}>

                        <View style ={styles.container}>

                            <Image source={{uri: props.auth.currentUserData.image }} style={styles.avatar}></Image>

                            <Item rounded style={{width: 275}}>
                                <Input placeholderTextColor='#c7c9d1' autoFoucs={true} multiline={true} numberOfLines={4} style={styles.text}  placeholder={`Comment as ${props.auth.currentUserData.handle}`}/>

                            </Item>

                        </View>

                    </Footer>

                </Container>

            </KeyboardAvoidingView>

            </View>

        )

}

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps) (Comment)

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        height: 50,
        marginTop:10
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,

    },
    inputStyle:{
        color: 'pink'
    },
    text:{
        fontSize:14,
        fontFamily: 'OldStandardTT-Regular'


    }
})