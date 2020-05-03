import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform
} from 'react-native';

//import { DrawerItems } from 'react-navigation';
import {DrawerItemList} from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
class CustomDrawerComponent extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView />
                <View
                    style={{
                        height: 150,
                       alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: Platform.OS == 'android' ? 20 : 0
                    }}
                >
                    <Ionicons name="ios-bookmarks" size={100} />
                    <Text style={{ fontSize: 24, color: 'white', fontWeight: '100' }}>
                        Book Worm
                    </Text>
                </View>
                <DrawerItemList {...this.props} />
            </ScrollView>
        );
    }
}
export default CustomDrawerComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
