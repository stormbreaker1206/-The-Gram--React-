import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Ionicons, FontAwesome, Octicons} from "@expo/vector-icons";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import {getNumberOfPosts, snapshotToArray} from "../../helpers/firebaseHelpers";
import UserPost from "../../components/PostComponent/UserPost";

class UserProfile extends React.Component {

    state={
        numberOfPost:null,
        user: this.props.route.params.id
    }

    componentDidMount() {
        getNumberOfPosts(this.state.user).then(res=>{
            this.setState({numberOfPost: res})
        })
    }

    Redirect = ()=> {
        this.props.navigation.navigate('HomeTabNavigator')
       }

   render(){
      return(
        <ScrollView>
            <View style={styles.centeredView}>
                <TouchableOpacity
                    onPress={this.Redirect}
                >
                    <View style={styles.header}>


                        <Ionicons color='black'  name="ios-arrow-back" size={24} />


                        <Text style={styles.textStyle}>{this.props.userPostData.handle}</Text>
                        <Text></Text>

                    </View>
                </TouchableOpacity>

                <View style={styles.wallerPaper}>
                    <Image source={{uri: this.props.userPostData.image }} resizeMode='cover' style={{width:'100%', height:200}}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: this.props.userPostData.image }} style={styles.circleImage}/>
                </View>



                <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
                <TouchableOpacity style={styles.follow}>

                    <Text style={styles.followText}> Give Kudos</Text>
                    <FontAwesome style={styles.icon}  name="thumbs-o-up" size={24} color="white" />
                    <Text style={styles.followText}> 12</Text>
                </TouchableOpacity>

                    <TouchableOpacity style={styles.followSettings}>
                        <Octicons name="comment" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.followSettings}>
                        <Ionicons  name="ios-more" size={24} color="black" />
                    </TouchableOpacity>


                </View>


                {/* <View style={styles.container}>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Grammers</Text>
                    </View>
                    <View style={[styles.statContainer, styles.divider]}>
                        <Text style={styles.number}>{this.state.numberOfPost}</Text>
                        <Text style={styles.stat}>Posts</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Kudos</Text>
                    </View>

                </View> */}
                <View style={{flex:1, justifyContent:'center', alignContent:'center', marginTop: 8}}>

                    <Text style={styles.postText}>Posts</Text>


                    <View>
                        {this.props.post.map((posts) =>{
                            return  (

                                <UserPost item={posts} key={posts.key}/>

                            );

                        })}
                    </View>


                </View>

            </View>
        </ScrollView>
    );
}




}

const mapStateToProps = ({userPostData: {userPostData, post}}) => ({
    userPostData,
    post

})
export default connect(mapStateToProps) (UserProfile);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        //justifyContent: "center",
        //  alignItems: "center",
        //marginTop: Platform.OS === 'ios' ? 30 : 40
        backgroundColor: 'white'
    },
    textStyle: {
        color: "black",
        fontSize: 24,
        fontFamily: 'OldStandardTT-Regular'
    },
    header:{
        height: 60,
        marginTop: 20,
        padding:10,
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    imageContainer:{
        marginTop:16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:32,

    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginBottom: 8,
        backgroundColor: 'black',
        marginHorizontal: 16,
        borderRadius: 16,
        marginTop: 25
    },
    statContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    number:{
        fontSize: 20,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular"

    },
    stat:{
        fontSize: 11,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular",
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 6
    },
    divider:{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',

    },
    postText:{
        fontFamily: "OldStandardTT-Regular",
        color:'black',
        fontWeight:'700',
        fontSize: 15,
        textAlign:'center'

    },
    follow:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0078ff',
        width:250,
        height:40,
        borderRadius: 10,
        flexDirection: 'row',
        //paddingHorizontal: 24,
       // paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,


    },
    followSettings:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e9ebee',
        height:40,
        width:50,
         borderRadius: 10,
       //  flexDirection: 'row',
        //paddingHorizontal: 24,
        paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,

    },
    followText:{
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginLeft: 4,
        fontFamily: "OldStandardTT-Regular",
        marginTop: Platform.OS == "ios" ? 8 : 0,
        marginRight: Platform.OS == "ios" ? 0 : 5
    },
    icon:{
        paddingLeft: Platform.OS == "ios" ? 5 : 0
    },
    wallerPaper:{
        flex:1, justifyContent: 'center', margin:12,
        alignItems: 'center',
        overflow:"hidden",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    circleImage:{
        width: 150, height: 150, borderRadius: 150/2,
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        borderColor: 'white',
        borderWidth:5,
    }
})