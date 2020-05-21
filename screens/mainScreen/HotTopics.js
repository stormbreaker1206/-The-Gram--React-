import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator, FlatList} from 'react-native';
import PostComponent from "../../components/PostComponent/PostComponent";

class HotTopics extends React.Component{

    render() {
        return(
            <View style={styles.container}>

               <Text>Hot Topics</Text>

            </View>
        )
    }
}

export default HotTopics
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    }

});