import React from "react";
import {StyleSheet, View, ActivityIndicator} from "react-native";

const LoadingView = ()=> {

        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#0078ff"/>
            </View>
        );

}
export default LoadingView
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    }
});