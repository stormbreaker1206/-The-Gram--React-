import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform
} from 'react-native';
import {
    Avatar,
    Title,
    Drawer,
    Caption,
    Paragraph,
 } from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
//import { DrawerItems } from 'react-navigation';
import {DrawerItemList} from "@react-navigation/drawer";
import {connect} from 'react-redux';
import * as firebase from "firebase";
class CustomDrawerComponent extends Component {
    constructor(props) {
        super(props);
    }

    signOut = async () => {
        try {
            await firebase.auth().signOut();
            this.props.signOut()

        } catch (error) {
            alert('Unable to sign out right now');
        }
    };
    render() {
        return (
           
            <View style={{flex:1}}>
            <DrawerContentScrollView >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Nice-Whatsapp-Dp-Profile-Images-101-300x300.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
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
                            <Ionicons name="ios-exit" size={24} />
                        )}
                        label="Sign Out"
                        onPress={this.signOut}
                    />
                </Drawer.Section>
            </View>

        );
    }
}

const mapDispatchToprops = dispatch =>{
    return{

        signOut: () => dispatch({type: 'SIGN_OUT'})
    }

}


export default connect(null, mapDispatchToprops) (CustomDrawerComponent);

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
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
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
        fontWeight: 'bold',
        marginRight: 3,
    },
    bottomDrawerSection: {


    }



});
