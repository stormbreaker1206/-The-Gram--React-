import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Status (){

    return(
        <View style={styles.container}>
            <View style={styles.statContainer}>
                <Text style={styles.number}>12k</Text>
                <Text style={styles.stat}>Grammers</Text>
            </View>
            <View style={[styles.statContainer, styles.divider]}>
                <Text style={styles.number}>12k</Text>
                <Text style={styles.stat}>Posts</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.number}>12k</Text>
                <Text style={styles.stat}>Kudos</Text>
            </View>
            
        </View>

    );

}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginBottom: 8,
        backgroundColor: 'black',
        marginHorizontal: 16,
        borderRadius: 16,
        marginTop: 25
    },
    text:{
        color:'white'
    },
    statContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    number:{
        fontSize: 20,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular"

    },
    stat:{
        fontSize: 11,
        fontWeight: "200",
        color: 'white',
        fontFamily: "OldStandardTT-Regular",
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginTop: 6
    },
    divider:{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',
      
    }

});