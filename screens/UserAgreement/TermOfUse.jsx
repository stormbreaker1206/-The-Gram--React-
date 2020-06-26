import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Body, Container, Content, Header, Left, Right} from "native-base";
import {Ionicons} from "@expo/vector-icons";


const TermOfUse = ({navigation})=>{
    return(

        <Container>
            <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                <Left>
                    <TouchableOpacity style={{paddingLeft:5}}
                                      onPress={()=>navigation.goBack()}
                    >
                        <Ionicons color='black'  name="ios-arrow-back" size={30} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={styles.textStyle}>Terms of Use</Text>
                </Body>
                <Right>

                </Right>
            </Header>

            <Content>

                <Text style={styles.paragraphStyle}>
                    These Terms of Use govern your use of The Gram and provide information about the Gram's Service,
                    When you create an account with the Gram, you agree to the services outlined below.
                </Text>

            </Content>

        </Container>




    )
}

export default TermOfUse

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    textStyle: {
        color: "black",
        fontSize: 19,
        fontFamily: 'OldStandardTT-Regular'
    },
    paragraphStyle:{
        fontFamily: 'OldStandardTT-Regular',
        fontSize: 17,
        padding: 10
    }
})