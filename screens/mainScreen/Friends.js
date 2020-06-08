import React from 'react';
import FriendList from "../../components/FriendsComponent/FriendListComponent";
import {View} from "react-native";
const Friends = ({navigation})=> {




  const  Redirect = () => {
        navigation.navigate('Home')
    }


        return (


            <FriendList onPress={Redirect}/>



        )

}

export default Friends

