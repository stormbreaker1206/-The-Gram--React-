import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {Body, Content, Container, Header, Left, Right,} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {SearchBar} from 'react-native-elements';
import CardList from "./Card";
import * as firebase from "firebase";
import {snapshotToArray} from "../../helpers/firebaseHelpers";
let postArray =''
class FriendList extends React.Component {
    state={
        allUser:[],
        filterData:[],
        isLoading:false,
        search: ''

    }


    updateSearch = search => {
        this.setState({ search });
        let filterUsers = this.state.allUser
        let filteredName = filterUsers.filter((item) => {
            return item.handle.toLowerCase().match(this.state.search.toLowerCase())

        })


        if (!filteredName.length) {
          this.setState({filterData: postArray})

        }

        else if(this.state.search.length === 1){
            this.setState({filterData: postArray})
        }

        else if (!this.state.search || this.state.search === '') {
            this.setState({
                filterData: postArray
            })
        }
         else if(Array.isArray(filteredName)) {
            this.setState({
                filterData: filteredName
            })


        }
    };

    componentDidMount() {
        this.getUsers()
        this.setState({isLoading:true})
        console.log(this.state.search)
    }


    getUsers = async () => {

        try {
            const posts = await firebase
                .database()
                .ref('users').orderByChild('id');
            posts.on('value',  (snapshot) => {
                postArray = snapshotToArray(snapshot)
                this.setState({allUser: postArray,  filterData: postArray, isLoading:false})



            });
        }catch (e) {
            console.log(e)
        }



    }

    render() {
        const { search } = this.state;
        const {navigation} = this.props
        return (


            <Container >
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.Touch}
                                      onPress={()=>navigation.navigate('HomeTabNavigator')}>
                        <Ionicons name="ios-arrow-back" size={30} color="black"/>
                    </TouchableOpacity>

                    <SearchBar

                        inputContainerStyle={styles.searchBarInput}
                        containerStyle={styles.searchBarContainer}
                        placeholder="..."
                        onChangeText={this.updateSearch}
                        value={search}

                    />

                </View>
                <Content>

                    {
                        this.state.isLoading ? (
                            <ActivityIndicator color = 'black' size = "large" style = {styles.activityIndicator}/>
                        ): (
                            this.state.filterData.map((user)=>{
                                return(

                                    <CardList navigation={navigation} item={user} key={user.key}/>
                                )

                            })
                        )


                    }


                </Content>

            </Container>


        )
    }


}

export default FriendList;

const styles = StyleSheet.create({
    container: {
      padding: 8

    },
    Touch:{
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        marginTop: 22
    },
    searchBarContainer:{
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderTopColor: 'white',
        flex: 1
    },
    searchBarInput:{
        borderRadius: 10,
        height: 35,
        marginTop: 20,
        backgroundColor: '#f0f0f0',


    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})