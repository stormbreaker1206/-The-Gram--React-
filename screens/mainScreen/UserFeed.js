import React from "react";
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator} from "react-native";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import PostComponent from "../../components/PostComponent/PostComponent";
import {snapshotToArray} from "../../helpers/firebaseHelpers";


class UserFeed extends React.Component{
    state ={
        currentUserId: null,
        isLoading: false,

       // postData: [],
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
            const id = this.props.currentUser.uid;
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
                    //this.setState({postData: postArray})
                    this.props.GetPostData(postArray.reverse())
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

                {this.props.isLoading ? (
                    <ActivityIndicator color = 'black' size = "large" style = {styles.activityIndicator}/>
                ): (

                <PostComponent data={this.props.postData}  user={this.props.currentUser} navigation={this.props.navigation}/>
                    )}

            </View>
        );
    }
}

const mapStateToProps = ({auth: {currentUser}, userPostData:{postData, isLoading}}) => ({
    currentUser,
    postData,
    isLoading


})

const mapDispatchToprops = dispatch =>{
    return{
        GetCurrentData: data => dispatch({type:'GET_USER_DATA', payload:data}),
        GetPostData: data => dispatch({type: 'GET_POST_DATA', payload:data}),


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
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    }

});