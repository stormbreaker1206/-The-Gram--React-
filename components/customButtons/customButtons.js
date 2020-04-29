import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomButton = ({text, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        marginTop:30,
        width:200,
        borderWidth:0.5,
        borderRadius: 8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor: 'transparent',
        borderColor:'#D7CFCF',

    },
    buttonText:{
        color:'white',
        fontWeight:'100',
        fontSize: 16,
        textAlign:'center',
        fontFamily: 'OldStandardTT-Regular'
    }
});

export default CustomButton;
