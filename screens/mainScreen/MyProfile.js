import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import ProfileHeader from '../../components/customHeader/ProfileHeader';
const { height } = Dimensions.get('window');
import Status from '../../components/customHeader/status';
import Posts from '../../components/customHeader/Posts';

//let postUserId = this.props.route.params.id;
class MyProfile extends React.Component{

    
    Redirect = ()=> {
       this.props.navigation.navigate('Home')
    }
    render() {
      
       
        
        return(
            <ScrollView style={styles.container}>

            <ProfileHeader onPress={this.Redirect} />
            <Status/>
            <Posts/>


            </ScrollView>


              
        )
    }
}


export default  MyProfile;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFF"
    }
});