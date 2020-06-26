import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as firebase from "firebase";
import {snapshotToArray} from '../../helpers/firebaseHelpers';
import {connect} from 'react-redux';
import UserPost from '../PostComponent/UserPost';

    class Posts extends React.Component{

        
    state={
        postArray: [],
        currentUserPostId : this.props.currentUserPostId,
        profileId: null,
        currentUserId: this.props.auth.currentUser.uid,

    }
    
    componentDidMount(){
        this.getData();

    }

    getData = async () =>{

        try {


            const id = this.props.auth.currentUser.uid;
            const posts = await firebase
                .database()
                .ref('posts').orderByChild('id').equalTo(id);
                posts.on('value',  (snapshot) => {
                    const postArray = snapshotToArray(snapshot)
                    this.setState({postArray: postArray.reverse()})
                 

                });
        }catch (e) {
            console.log(e)
        }


    }


        render(){
            return(
                <View style={styles.container}>
                    <Text style={styles.text}>My Posts</Text>
                   
                    <View>
                        {this.state.postArray.map((posts) =>{
                            return  (

                            <UserPost navigation={this.props.navigation}  item={posts} key={posts.key}/>
                                
                            );
                            
                        })}
                    </View>
                </View>
        
            );
        
        }

   
}
const mapStateToProps = state => {
    return{
        auth:state.auth

    }
}


export default connect(mapStateToProps) (Posts);

const styles = StyleSheet.create({
    container:{
       // paddingVertical: 24,
      //  paddingHorizontal: 15,
        marginBottom: 8,
        marginTop: 8
    },
    text:{
        fontFamily: "OldStandardTT-Regular",
        color:'black',
        fontWeight:'700',
        fontSize: 15,
        textAlign:'center'
    },
  
    photo:{
        width: 100,
        height: 100,
        marginBottom: 12,
        borderRadius:8
    }
 
});