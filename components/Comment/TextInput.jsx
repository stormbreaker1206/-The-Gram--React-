import React from "react";
import {Input} from "native-base";
import {
    Image, KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View, ScrollView, Modal
} from "react-native";
const TextInput = ()=>{
    return(
        <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <Input  autoFocus={true} placeholderTextColor='#c7c9d1' autoFoucs={true}
                multiline={true} numberOfLines={4} style={styles.text} />
        </KeyboardAvoidingView>
    )
}

export default TextInput;
const styles = StyleSheet.create({

})