import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator, FlatList} from 'react-native';
import PostComponent from "../../components/PostComponent/PostComponent";
import * as firebase from "firebase";
import {connect} from 'react-redux';
import {snapshotToArray} from "../../helpers/firebaseHelpers";

class HotTopics extends React.Component{
    _isMounted = false;
    state = {
      postId: null,
      hotTopicsPostID: [],
      hotTopicsPostData: []
    }

    async componentDidMount() {

            await this.getLikePosts()


    }

    getLikePosts = async ()=> {
        //this.setState({hotTopicsPostID:[]})
        let likeId = []
        let likesResults =[]
        const post = await firebase.database().ref('posts');
        post.on('value', (snapshot)=> {
            if(snapshot.exists()) {
                snapshot.forEach(function (snapshot1) {

                    likeId.push(snapshot1.key)
                  //  console.log(likeId)

                    likeId.map(like =>{
                        firebase.database().ref('posts').child(like).child('likes').on("value", (snap)=>{
                            if(snap.exists()){
                                let count = snap.numChildren()

                                if(count > 100){

                                    likesResults.push(like)


                                }


                            }

                        })
                    })
                })


            }
            //
            let unique = [...new Set(likesResults)]
           this.setState({hotTopicsPostID: unique}, ()=>this.getHotTopics())
             //console.log(this.state.hotTopicsPostID)

        })

    }

    getHotTopics = async () =>{
        try {
            let array = this.state.hotTopicsPostID

            let result = []
            await array.map(postId => {
                firebase.database().ref('posts').child(postId).on('value',  (snap)=> {
                    //  console.log(snap)
                    result.push(snap)
                })
            })
            //console.log(result)
            const postArray = await snapshotToArray(result)
            await this.setState({hotTopicsPostData: postArray.reverse() })

        }catch (e) {
            console.log(e)
        }
       // console.log(this.state.hotTopicsPostData)
    }

    render() {
        return(
            <View style={styles.container}>

                {Array.isArray(this.state.hotTopicsPostData) && this.state.hotTopicsPostData.length  ? (
                    <PostComponent data={this.state.hotTopicsPostData} user={this.props.currentUser} navigation={this.props.navigation}/>
                ): (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>No trending posts</Text>
                    </View>
                )}



            </View>
        )
    }
}
const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,

})
export default connect(mapStateToProps) (HotTopics)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
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


});