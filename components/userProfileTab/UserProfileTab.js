import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

const UserProfileTab = () => {
    return(
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
                        <Title style={styles.title}>Handle: mpUkpo</Title>
                        <Caption style={styles.caption}>Encrypted: DDBkY</Caption>
                    </View>
                </View>

            </View>
            <View style={styles.textInputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="What's the latest?"

                />
            </View>
        </View>
    )
}

export default UserProfileTab;

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
    textInput:{
        marginVertical: 10, fontSize: 17, borderColor: 'black', borderWidth: 0.5, flex:1, borderRadius: 5
    },
    textInputView:{
        height: 60,
        flexDirection: 'row',
        margin: 5
    },

});
