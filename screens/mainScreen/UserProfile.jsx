import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import {snapshotToArray} from "../../helpers/firebaseHelpers";
import UserPost from "../../components/PostComponent/UserPost";

class UserProfile extends React.Component {

   Redirect = ()=> {
        this.props.navigation.navigate('Home')
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


                        <Text style={styles.textStyle}>{this.props.auth.userPostData.handle}</Text>
                        <Text></Text>

                    </View>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={{uri: this.props.auth.userPostData.image }} style={styles.avatar}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Grammers</Text>
                    </View>
                    <View style={[styles.statContainer, styles.divider]}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Posts</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.number}>12k</Text>
                        <Text style={styles.stat}>Kudos</Text>
                    </View>

                </View>
                <View style={{flex:1, marginTop: 8}}>
                    <Text style={styles.postText}>Posts</Text>


                    <View>
                        {this.props.auth.post.map((posts) =>{
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

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}
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

    }
})