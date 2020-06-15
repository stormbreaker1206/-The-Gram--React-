import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import ProfileHeader from '../../components/customHeader/ProfileHeader';
import Status from '../../components/customHeader/status';
import Posts from '../../components/customHeader/Posts';
//const { height } = Dimensions.get('window');
const screenWidth = Math.round(Dimensions.get('window').width);
class MyProfile extends React.Component{
    state={
        width : screenWidth
    }
   // componentDidMount() {
   //     this.setState({postUserId: this.props.route.params.id})
   // }


    Redirect = ()=> {
       this.props.navigation.navigate('HomeTabNavigator')
    }
    Navigation =()=>{
        this.props.navigation.navigate('Settings')
    }
    render() {

       
        
        return(
            <ScrollView style={styles.container}>

            <ProfileHeader onPress={this.Redirect} />
            <Status onPress={this.Navigation}/>
            <Posts navigation={this.props.navigation}/>


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