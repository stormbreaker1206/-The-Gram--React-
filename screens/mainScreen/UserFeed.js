import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import PostComponent from "../../components/PostComponent/PostComponent";
import {snapshotToArray} from "../../helpers/firebaseHelpers";


class UserFeed extends React.Component{
    state ={
        currentUserId: null,
        isLoading: false,
        postData: [],
       // profile : this.props.navigation.navigate('MyProfile')
    }


    componentDidMount() {
        Promise.all([
            this.getUserData(),
            this.getPost(),
        ]);
    
    }


    getUserData = async () => {
        try {
            const id = this.props.auth.currentUser.uid;
            const currentUserData = await  firebase.database().ref('users')
                .child(id).on('value', (snapshot) =>{
                    this.props.GetCurrentData(snapshot.val())
                })
        }catch (e) {
            console.log(e)
        }


    }

    getPost = async () => {
        try {
            const posts = await firebase
                .database()
                .ref('posts').orderByChild('time');
                posts.on('value',  (snapshot) => {
                    const postArray = snapshotToArray(snapshot)
                    this.setState({postData: postArray})
                   // console.log(checkLikes(postArray));
                   // console.log(postArray)

                });
        }catch (e) {
            console.log(e)
        }



    }


   
    render() {
        return (
            <View style={styles.container}>

                <PostComponent navigation={this.props.navigation} data={this.state.postData}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth

    }
}

const mapDispatchToprops = dispatch =>{
    return{
        GetCurrentData: data => dispatch({type:'GET_USER_DATA', payload:data})

    }

}

export default connect(mapStateToProps, mapDispatchToprops) (UserFeed)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    }

});