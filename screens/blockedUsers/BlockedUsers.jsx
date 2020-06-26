import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Body, Container, Content, Header, Left, Right} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {getBlockedUsers} from "../../helpers/userUtilis";
import {connect} from 'react-redux';
import BlockedCard from "../../components/BlockedUserComponent/BlockedCard";
import * as firebase from "firebase";
import {snapshotToArray} from "../../helpers/firebaseHelpers";
class BlockedUsers extends React.Component{
    state={
        data: [],

    }

    componentDidMount() {
        this.getBlockedUsersData()
    }

    getBlockedUsersData = async () =>{
        const getData = getBlockedUsers(this.props.currentUserData)
        let result = []
        getData.map(id =>{
            firebase.database().ref('users').child(id).once("value", (snap)=>{
                if(snap.exists()){
                    result.push(snap)


                }

            })
        })
        const postArray = snapshotToArray(result)
        this.setState({data: postArray})
    }

    render() {

    return(

      

                                <Container>
                                    <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                                        <Left>
                                            <TouchableOpacity style={{paddingLeft:5}}
                                                onPress={()=>this.props.navigation.goBack()}
                                            >
                                               <Ionicons color='black'  name="ios-arrow-back" size={30} />
                                            </TouchableOpacity>
                                        </Left>
                                        <Body>
                                        <Text style={styles.textStyle}>Blocked Users</Text>
                                        </Body>
                                        <Right>
                                           
                                        </Right>
                                    </Header>
                                    
                                    <Content>

          
                                        {this.state.data.map((results)=>{
                                            return(
                                                <BlockedCard item={results} key={results.id}/>
                                            )
                                        })}
                            </Content>
                            </Container>
        

    )

}

}
const mapStateToProps = ({auth: {currentUserData}}) => ({
    currentUserData,

})
export default connect(mapStateToProps) (BlockedUsers)

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        marginTop: 5
    },
 
    textStyle: {
        color: "black",
        fontSize: 19,
        fontFamily: 'OldStandardTT-Regular'
    }
})