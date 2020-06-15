import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Ionicons, FontAwesome, Octicons, AntDesign, Feather} from "@expo/vector-icons";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import { connectActionSheet } from '@expo/react-native-action-sheet';
import {getNumberOfPosts,} from "../../helpers/firebaseHelpers";
import UserPost from "../../components/PostComponent/UserPost";
import { compose } from 'redux';

class UserProfile extends React.Component {

    state={
        numberOfPost:null,
        user: this.props.route.params.id,
        isPrivate: false,

    }

    componentDidMount() {
        getNumberOfPosts(this.state.user).then(res=>{
            this.setState({numberOfPost: res})
        })


    }


    _onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        const options = ['Give a Kudos', 'Report', 'Block', 'Cancel'];

        const cancelButtonIndex = 3;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {
                // Do something here depending on the button index selected
            },
        );
    };


    Redirect = ()=> {
        this.props.navigation.navigate('HomeTabNavigator')
       }

   render(){
      return(
        <View style={{flex:1}}>

            {this.props.userLoaded ? (
                <ActivityIndicator color = 'black' size = "large" style = {styles.activityIndicator}/>
            ): (

                <View style={{flex:1}}>

                {this.state.isPrivate ? (
                        <View style={{flex:1}}>
                            <View style={styles.header}>

                                <TouchableOpacity style={{flexDirection:'row', justifyContent: 'space-between', flex:1}} onPress={this.Redirect}>
                                    <Ionicons color='black'  name="ios-arrow-back" size={24} />
                                    <Text style={styles.textStyle}>{this.props.userPostData.handle}</Text>
                                    <Text></Text>
                                </TouchableOpacity>

                            </View>


                            <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', marginTop:60}}>

                                <AntDesign style={{alignSelf: 'center'}} name="lock" size={32} color="black" />

                                <Text style={{fontSize:24, textAlign:'center', fontFamily: 'OldStandardTT-Regular'}}>This Profile is Private</Text>


                            </View>


                        </View>
                    ): (
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

                                        <Text style={styles.followText}> Give a Kudos</Text>
                                        <FontAwesome style={styles.icon}  name="thumbs-o-up" size={24} color="white" />
                                        <Text style={styles.followText}> 12</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity  style={styles.followSettings}>
                                        <Octicons name="comment" size={24} color="black" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>this._onOpenActionSheet()} style={styles.followSettings}>
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

                                                <UserPost navigation={this.props.navigation} item={posts} key={posts.key}/>

                                            );

                                        })}
                                    </View>


                                </View>

                            </View>
                        </ScrollView>
                    )}

                </View>

            )}

        </View>
    );
}




}



const mapStateToProps = ({userPostData: {userPostData, post, userLoaded}}) => ({
    userPostData,
    post,
    userLoaded

})

const wrapper = compose(
    connect(mapStateToProps),
    connectActionSheet
);
export default wrapper (UserProfile);

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
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    }
})