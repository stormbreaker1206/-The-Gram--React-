import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from "moment";
import {Ionicons, Octicons} from "@expo/vector-icons";
import {Video} from "expo-av";


const CommentFlatList = ({item}) => {
    return (


        <View style={styles.feedItem}>


            <View>

                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={{uri: item.userImage}} style={styles.avatar}/>
                        <Text style={styles.name}>{item.handle}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>

                            <Text style={styles.timestamp}>{moment(item.timePosted).fromNow()}</Text>
                        </View>


                    </View>

                    <Text style={styles.post}>{item.comments}</Text>



                </View>
            </View>
        </View>
    )

}
export default CommentFlatList;

const styles = StyleSheet.create({

    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,


    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "black",
        fontFamily: 'OldStandardTT-Regular'

    },
    timestamp: {
        fontSize: 14,
        color: "#C4C6CE",
        marginTop: 4,
        fontFamily: 'OldStandardTT-Regular'
    },
    post: {
        marginTop: 14,
        fontSize: 14,
        color: "black",
        fontFamily: 'OldStandardTT-Regular'

    },
    text: {
        fontFamily: 'OldStandardTT-Regular'
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 16
    }

});