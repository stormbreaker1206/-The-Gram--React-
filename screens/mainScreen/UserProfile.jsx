import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import {Ionicons, FontAwesome, AntDesign, MaterialIcons} from "@expo/vector-icons";
import {connect} from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import {ifBlockExist, ifKudosExist, checkKudosCount} from "../../helpers/userUtilis";
import {getNumberOfPosts, blockUser, giveKudos, reportUser} from "../../helpers/firebaseHelpers";
import UserPost from "../../components/PostComponent/UserPost";
import { compose } from 'redux';
import * as firebase from "firebase";

class UserProfile extends React.Component {
    _isMounted = false

    state={
        numberOfPost:null,
        isPrivate: null,
        kudos: null,
        results: {},
        screen:this.props.route.params.screen


    }


    componentDidMount() {

        this._isMounted = true;
        if (this._isMounted) {
            getNumberOfPosts(this.props.route.params.id).then(res => {
                this.setState({numberOfPost: res})

            })
            this.getUserinfo()

        }
    }

    getUserinfo = async () => {
        try {
            const id = this.props.route.params.id;
            const currentUser = await  firebase.database().ref('users')
                .child(id).once('value', (snapshot)=>{
                    this.setState({results: snapshot.val()})
                })
        }catch (e) {
            console.log(e)
        }


    }
    componentWillUnmount() {
        this._isMounted = false;

    }


    _onOpenActionSheet = (getBlockedData, getKudos) => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html

        const options = [getKudos,  getBlockedData, 'Cancel'];

        const cancelButtonIndex = 2;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,

            },
            buttonIndex => {

                if(buttonIndex == 0){
                    giveKudos(this.props.currentUser.uid, this.props.route.params.id).then(res=>{
                        this.getUserinfo()
                    })


                }


                else if(buttonIndex == 1){
                    blockUser(this.props.currentUser.uid, this.props.route.params.id)
                }
                // Do something here depending on the button index selected
            },
        );
    };


    Redirect = ()=> {
        this.props.navigation.navigate(this.state.screen)
       }

    searchUsers = ()=>{
        this.props.navigation.navigate('Friends')
    }

   render(){
       const getBlockedData = ifBlockExist(this.props.currentUserData, this.props.route.params.id)
       const getKudos = ifKudosExist(this.state.results, this.props.currentUser.uid)
       const getNumberOfKudos = checkKudosCount(this.state.results)

       //console.log(this.props.userPostData)

      return(
        <View style={{flex:1, backgroundColor:'white'}}>

            {this.props.userLoaded ? (
                <ActivityIndicator color = 'black' size = "large" style = {styles.activityIndicator}/>
            ): (

                <View style={{flex:1}}>


                        <ScrollView>


                            <View style={styles.centeredView}>
                                <TouchableOpacity
                                    onPress={this.Redirect}
                                >
                                    <View style={styles.header}>


                                        <Ionicons color='black'  name="ios-arrow-back" size={30} />


                                        <Text style={styles.textStyle}>{this.state.results.handle}</Text>
                                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Friends')}>
                                            <MaterialIcons color='black' style={{paddingRight:10}} name='search' size={30} />
                                        </TouchableWithoutFeedback>

                                    </View>
                                </TouchableOpacity>

                                <View style={styles.wallerPaper}>
                                    <Image source={{uri: this.state.results.image }} resizeMode='cover' style={{width:'100%', height:200}}/>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: this.state.results.image }} style={styles.circleImage}/>
                                </View>

                                {this.state.results.profilePrivacy ? (
                                    <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', marginTop:30}}>

                                        <AntDesign style={{alignSelf: 'center'}} name="lock" size={24} color="black" />

                                        <Text style={{fontSize:20, textAlign:'center', fontFamily: 'OldStandardTT-Regular'}}>This Profile is Private</Text>

                                    </View>

                                ): (
                                <View>
                                <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
                                    <TouchableOpacity style={styles.follow}>

                                        <Text style={styles.followText}> Give a Kudos</Text>
                                        <FontAwesome style={styles.icon}  name="thumbs-o-up" size={24} color="white" />
                                        <Text style={styles.followText}> {getNumberOfKudos}</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={()=>this._onOpenActionSheet(getBlockedData, getKudos)} style={styles.followSettings}>
                                        <Ionicons  name="ios-more" size={24} color="black" />
                                    </TouchableOpacity>


                                </View>

                                <View style={{flex:1, justifyContent:'center', alignContent:'center', marginTop: 8}}>

                                    <Text style={styles.postText}>{this.state.numberOfPost} Posts</Text>


                                    <View>
                                        {this.props.post.map((posts) =>{
                                            return  (

                                                <UserPost navigation={this.props.navigation} item={posts} key={posts.key}/>

                                            );

                                        })}
                                    </View>


                                </View>
                                    </View>
                                    )}

                            </View>
                        </ScrollView>


                </View>

            )}

        </View>
    );
}


}




const mapStateToProps = ({auth:{currentUser, currentUserData},userPostData: {post, userLoaded}}) => ({

    post,
    userLoaded,
    currentUser,
    currentUserData

})

const wrapper = compose(
    connect(mapStateToProps),
    connectActionSheet
);
export default wrapper (UserProfile);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        //justifyContent: "center",
        //  alignItems: "center",
        //marginTop: Platform.OS === 'ios' ? 30 : 40
        backgroundColor: 'white'
    },
    textStyle: {
        color: "black",
        fontSize: 24,
        fontFamily: 'OldStandardTT-Regular'
    },
    header:{
        height: 60,
        marginTop: 20,
        padding:10,
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    imageContainer:{
        marginTop:16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:32,

    },
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

    },
    postText:{
        fontFamily: "OldStandardTT-Regular",
        color:'black',
        fontWeight:'700',
        fontSize: 15,
        textAlign:'center'

    },
    follow:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0078ff',
        width:300,
        height:40,
        borderRadius: 10,
        flexDirection: 'row',
        //paddingHorizontal: 24,
       // paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,


    },
    followSettings:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e9ebee',
        height:40,
        width:50,
         borderRadius: 10,
       //  flexDirection: 'row',
        //paddingHorizontal: 24,
        paddingVertical: 8,
        marginTop: 16,
        borderColor: 'white',
        borderWidth:2,

    },
    followText:{
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginLeft: 4,
        fontFamily: "OldStandardTT-Regular",
        marginTop: Platform.OS == "ios" ? 8 : 0,
        marginRight: Platform.OS == "ios" ? 0 : 5
    },
    icon:{
        paddingLeft: Platform.OS == "ios" ? 5 : 0
    },
    wallerPaper:{
        flex:1, justifyContent: 'center', margin:12,
        alignItems: 'center',
        overflow:"hidden",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    circleImage:{
        width: 150, height: 150, borderRadius: 150/2,
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        borderColor: 'white',
        borderWidth:5,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },

})