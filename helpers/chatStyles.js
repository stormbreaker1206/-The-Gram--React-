import {Composer, InputToolbar, Bubble, Send} from "react-native-gifted-chat";
import React from "react";
import {
    Image,

} from "react-native";
export const  renderInputToolbar = (props) => (
    <InputToolbar
        {...props}
        containerStyle={{
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            borderWidth:1,
            // paddingTop: 6,
            borderRadius:25,
            borderColor:'#f0f0f0',
            marginRight:5,
            marginLeft:5,
            marginBottom:5,
            height:40

        }}
        primaryStyle={{ alignItems: 'center' }}
    />
);

export const renderSend = (props) => (
    <Send
        {...props}

        containerStyle={{
            width: 60,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:4,
            marginRight:5,

        }}
    >

    </Send>
);

export const  renderComposer = (props) => (
    <Composer
        {...props}
        textInputStyle={{
            borderRadius: 5,
            marginLeft: 0,
            fontFamily: "OldStandardTT-Regular",
            paddingLeft:5,

        }}

        placeholder='Send a message...'
    />
);

export const renderBubble = (props)=> {
    return (
        <Bubble
            {...props}

            textStyle={{
                right: {
                    color: 'white',
                    fontFamily: "OldStandardTT-Regular",


                },
                left: {
                    color: '#73788B',
                    fontFamily: "OldStandardTT-Regular",

                },

            }}

            wrapperStyle={{
                left: {
                    marginTop: 10
                },

            }}

        />
    )
}
