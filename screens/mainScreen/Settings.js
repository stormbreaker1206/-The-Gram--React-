import React from 'react';
import CustomButton from "../../components/customButtons/customButtons";
import * as firebase from 'firebase/app';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
class Settings extends React.Component{

    signOut = async () => {
        try {
            await firebase.auth().signOut();
            this.props.signOut()

        } catch (error) {
            alert('Unable to sign out right now');
        }
    };
    render() {
        return(
            <View style={style.container}>
                <CustomButton text='Logout Out' onPress={this.signOut} />
            </View>
        )
    }
}
const mapDispatchToprops = dispatch =>{
    return{

        signOut: () => dispatch({type: 'SIGN_OUT'})
    }

}

export default connect(null, mapDispatchToprops)(Settings)

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})