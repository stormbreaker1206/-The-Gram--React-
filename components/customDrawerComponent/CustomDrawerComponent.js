import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View, Text, StyleSheet,ScrollView, SafeAreaView,  Platform} from 'react-native';
import {Avatar, Title,Drawer, Caption, Paragraph,} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
//import { DrawerItems } from 'react-navigation';
import {DrawerItemList} from "@react-navigation/drawer";
import {connect} from 'react-redux';
import * as firebase from "firebase";
class CustomDrawerComponent extends Component {

    state = {
        results: {},
       
        
    }


    componentDidMount() {
        this.getUserData()

    }

    getUserData = async () => {
        try {
            const id = this.props.currentUser.uid;
            const currentUser = await  firebase.database().ref('users')
                .child(id).on('value', (snapshot)=>{
                    this.setState({results: snapshot.val()})
                })
        }catch (e) {
            console.log(e)
        }


    }



    signOut = async () => {
        try {
            await firebase.auth().signOut();
            await this.props.signOut()

        } catch (error) {
            alert('Unable to sign out right now');
        }
    };
    render() {
        return (

            <View style={{flex:1}}>
            <DrawerContentScrollView {...this.props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>

                        {this.state.results.image ? (
                        <Avatar.Image source={{uri: this.state.results.image }} style={styles.avatar}  size={50}/>
                    ): (
                    <Avatar.Image source={require('../../assets/white-bg.jpg')} style={styles.avatar}  size={50}/>
                    )}
                          
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{this.state.results.handle}</Title>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Grammers</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Posts</Caption>
                            </View>
                        </View>
                    </View>


                </View>
                <View style={{marginTop:30}}></View>
                <DrawerItemList {...this.props} />

            </DrawerContentScrollView>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Ionicons color='black' name="ios-exit" size={24} />
                        )}
                        label="Sign Out"
                        labelStyle={{fontFamily: 'OldStandardTT-Regular'}}

                        onPress={this.signOut}
                    />

                </Drawer.Section>
            </View>

        );
    }
}

const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,

})

const mapDispatchToprops = dispatch =>{
    return{

        signOut: () => dispatch({type: 'SIGN_OUT'})
    }

}


export default connect(mapStateToProps, mapDispatchToprops) (CustomDrawerComponent);

const styles = StyleSheet.create({

    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        fontFamily: 'OldStandardTT-Regular'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontFamily: 'OldStandardTT-Regular'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {

        marginRight: 3,
        fontFamily: 'OldStandardTT-Regular'
    },
    bottomDrawerSection: {


    }



});
