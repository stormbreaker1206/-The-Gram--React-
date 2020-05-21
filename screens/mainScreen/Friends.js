import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import {SearchBar} from 'react-native-elements';

import Header from "../../components/customHeader/Header";
import CustomButton from "../../components/customButtons/customButtons";

class Friends extends React.Component{


     Redirect = ()=> {
        this.props.navigation.navigate('Home')
    }
    render() {
        return(

            <View style={style.container}>
            <View style={{flex:1}}  >
            <Header onPress={this.Redirect} name="person-outline" text='Friends'> </Header>
           <SearchBar containerStyle={{backgroundColor:'white', borderColor: 'white'}}  placeholder="search Here..." round />
            
            </View>

            
            </View>
        )
    }
}

export default Friends

const style = StyleSheet.create({
    container:{
        flex:1,
   
    }
})