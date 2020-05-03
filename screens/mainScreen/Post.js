import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Button } from 'react-native';
import {randomName, hoursAgo, getCurrentTime, time2TimeAgo} from "../../helpers/userUtilis";

let current = new Date(2019, 5, 2, 8, 10, 30, 30);
let aDay = 24*60*60*1000;
let num = 1588478665;
class Post extends React.Component{

    getTime = ()=>{
      console.log(getCurrentTime())
    }


    render() {
        return(
            <View style={style.container}>
                <Text>
                    {randomName(5)}


                </Text>

                <Text>


                    {time2TimeAgo(1588478665)}

                </Text>

                <Text>
                    {hoursAgo(new Date('2020-05-02T05:21:14.308Z'))}
                </Text>

                 <Button title='get' onPress={this.getTime}/>
            </View>
        )
    }
}

export default Post

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})