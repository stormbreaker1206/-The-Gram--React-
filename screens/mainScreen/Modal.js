import React from 'react';
import { Alert, Image, SafeAreaView, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Container, Left, Right, Body, Header, Content, Footer, Button, FooterTab, Spinner} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {openCamera, openImageLibrary, prepareBlob} from "../../helpers/ImageHelpers";
import {Camera} from "expo-camera";
import {connect} from 'react-redux';
import {Video} from "expo-av";
import * as firebase from "firebase";
import 'firebase/storage'

class ModalView extends React.Component{


    state ={
        text: null,
        image: null,
        modalVisible: true,
        video : false,
        recording: false,
        type: Camera.Constants.Type.back,
        cameraRef: null,
        startRecording: false,
        flash: Camera.Constants.FlashMode.off,
        sec: 0,
        min: 0,
        dataInputResults: null,
        isLoading: false

    }

    createTwoButtonAlert = () =>
        Alert.alert(
            "Message",
            "Finished recording?",
            [
                {
                    text: "Discard",
                    onPress: () =>
                        this.setState({
                            sec: 0,
                            min: 0
                        }),
                    style: "cancel"
                },
                { text: "Use", onPress: () => this.use()

                }
            ],
            { cancelable: false }
        );


    startTimer = ()=> {

        this.clear = setInterval(this.descreaseSeconds, 1000)

    }
    stopTimer = ()=>{
        clearInterval(this.clear);

    }

    descreaseSeconds = () =>{

        if(this.state.sec === 0){

            this.setState({
                sec: 1
            })
        }else{
            this.setState((prevState) => {
                return{
                    sec: prevState.sec + 1,
                }

            })


            if(this.state.sec ===59) {
                this.setState({
                    min: 1,
                    sec: 0
                })
            }
        }

    }
   

    getTimestamp = () => {
        return Date.now()
    }

    startPost = async ()=>{

        if(this.state.image === null && this.state.text === null){
            alert("You cannot submit an empty post")
        }else {
             this.setState({isLoading: true})
             const image = await this.state.dataInputResults;
             //console.log(image)
             const text = this.state.text;
             if(image === null){
                const downloadText = await this.uploadText(text)

             }else if(image.type == "video") {
               const downloadVidUrl = await this.uploadVideo(image, text)

             }else if(image.base64) {
                const downloadUrl = await this.uploadPost(image, text)

             }else {
                 const downloadVidUrl = await this.uploadVideo(image, text)
             }

        }

       }

       uploadText = async (text) =>{
        try {

            let name = this.props.auth.currentUserData.handle;
            let proPic = '';
               
            if(this.props.auth.currentUserData.image){
             proPic = this.props.auth.currentUserData.image
         }else{
             proPic = 'https://hacked.com/wp-content/uploads/2016/01/Anonymous-mask_white-bg.jpg';
         }
            await firebase
                .database()
                .ref('posts')
                .push({ image: '', status: text, name: name, proPic: proPic, time: this.getTimestamp(), delete: 'false', type: 'text', id: this.props.auth.currentUser.uid });
            // await  this.setState({isLoading: false})
            this.Redirect()

        }catch (e) {
            console.log(e)
        }
       }

       uploadVideo = async  (video, text) =>{
           const path = `posts/${this.props.auth.currentUser.uid}/${Date.now()}`
           const ref = firebase.storage().ref(path)

           try {
               const blob = await prepareBlob(video.uri)
               const snapshot = await ref.put(blob)
               let downloadVideoUrl = await ref.getDownloadURL();

               let name = this.props.auth.currentUserData.handle;

              

               let proPic = '';

               if(this.props.auth.currentUserData.image){
                proPic = this.props.auth.currentUserData.image
            }else{
                proPic = 'https://hacked.com/wp-content/uploads/2016/01/Anonymous-mask_white-bg.jpg';
            }


               await firebase
                   .database()
                   .ref('posts')
                   .push({ image: downloadVideoUrl, status: text, name: name, proPic: proPic, time: this.getTimestamp(), delete: 'false', type: 'video', id: this.props.auth.currentUser.uid });
               // await  this.setState({isLoading: false})
               this.Redirect()
               return downloadVideoUrl;


           }catch (e) {
               console.log(e)
           }

       }

    uploadPost = async (image, text) => {
      //  this.setState({isLoading: true})

        const path = `posts/${this.props.auth.currentUser.uid}/${Date.now()}`
        const ref = firebase.storage().ref(path)
        try {
            const blob = await prepareBlob(image.uri)
            const snapshot = await ref.put(blob)

            let downloadUrl = await ref.getDownloadURL();
            let name = this.props.auth.currentUserData.handle;
            let proPic = '';
               
            if(this.props.auth.currentUserData.image){
             proPic = this.props.auth.currentUserData.image
         }else{
             proPic = 'https://hacked.com/wp-content/uploads/2016/01/Anonymous-mask_white-bg.jpg';
         }
            await firebase
                .database()
                .ref('posts')
                .push({ image: downloadUrl, status: text, name: name, proPic: proPic, time: this.getTimestamp(), delete: 'false', type: 'image', id: this.props.auth.currentUser.uid });
             // await  this.setState({isLoading: false})

            await this.Redirect()

            blob.close();

            return downloadUrl;


        }catch (e) {
            console.log(e)
        }
    }
    openImageLibrary = async () =>{
        const results = await openImageLibrary()
        const load = await this.setState({dataInputResults: results})
        if(results){

            if(results.base64) {
                this.setState({video:false})

            }else {
                this.setState({video:true})
            }
            this.setState({image: results.uri})

        }
    }

    loadCamera =  () =>{
          this.setState({startRecording: true, recording:false})

    }

    changeCamera = ()=>{
        const back = Camera.Constants.Type.back;
        const front = Camera.Constants.Type.front;
        if(this.state.type === back){
            this.setState({type: front})
        }else {
            this.setState({ type: back})
        }

    }
    changeFlash = ()=>{
        const off = Camera.Constants.FlashMode.off;
        const on = Camera.Constants.FlashMode.torch;
        if(this.state.flash === off){
            this.setState({flash: on})
        }else {
            this.setState({flash: off})
        }
    }
    use = ()=> {
        this.setState({startRecording:false, recording:false})

    }
    reset = ()=>{
        this.setState({startRecording:false, recording:false, image: null})
    }

    Redirect = () => {
        this.props.navigation.navigate('HomeTabNavigator');
        this.setState({isLoading: false})

    }
    recordVideo = async ()=> {
       if(!this.state.recording){
           this.startTimer();
           this.setState({recording:true, video:true})
           try {

               let video = await this.state.cameraRef.recordAsync();
               const load = await this.setState({dataInputResults: video})
               const res = this.setState({image:video.uri})
               //console.log('video', video);
           }catch (e) {
               console.log(e)
           }


        }else {

           this.setState({recording: false})
           this.state.cameraRef.stopRecording()
           this.stopTimer()
           this.createTwoButtonAlert()

        }


    }

    openCamera = async () => {

        const results = openCamera()

        if(results){
            const load = await this.setState({dataInputResults: results})
            const imageUri = (await results).uri
            this.setState({image: imageUri})

        }

    }



    render() {
        return(

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}

                >
                        {this.state.startRecording ?(


                                <View style={{ flex: 1 }}>
                                    <Camera style={{ flex: 1 }} type={this.state.type} flashMode={this.state.flash}  ref={ref => {this.state.cameraRef = ref; }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                 backgroundColor: 'transparent',

                                            }}>
                                            <View style={{alignSelf: 'flex-end', marginRight: 10, padding:10, marginTop: 10}}>
                                                <TouchableOpacity onPress={this.changeFlash}>
                                                <Ionicons name='ios-flash' color='white' size={32}></Ionicons>
                                                </TouchableOpacity>
                                                </View>

                                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <TouchableOpacity   style={{
                                                marginLeft: 20,
                                                alignSelf: 'flex-end'
                                            }}

                                                onPress={this.changeCamera}>
                                                <Ionicons color='white' style={{paddingLeft:10, marginBottom: 10}} name="ios-reverse-camera" size={32} />

                                            </TouchableOpacity>
                                                <View style={{alignSelf: 'flex-end'}}>

                                                <Text style={{color:'red', marginBottom: 20, marginRight: 10}}>0

                                                    {this.state.min}

                                                    :

                                                    {  this.state.sec === 0 ? "00": this.state.sec < 10 ? "0"+ this.state.sec: this.state.sec }
                                                </Text>
                                                </View>

                                            <TouchableOpacity   style={{
                                                marginRight: 20,
                                                alignSelf: 'flex-end'
                                            }}
                                                                                             onPress={this.reset}>
                                                <Ionicons color='white' style={{paddingRight:10, marginBottom: 10}} name="ios-close" size={32} />
                                            </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.recordVideo}>
                                                <View style={{
                                                    borderWidth: 2,
                                                    borderRadius:50,
                                                    borderColor: 'white',
                                                    height: 50,
                                                    width:50,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'}}
                                                >
                                                    <View style={{
                                                        borderWidth: 2,
                                                        borderRadius:50,
                                                        borderColor: this.state.recording ? ("red"):('white'),
                                                        height: 40,
                                                        width:40,
                                                        backgroundColor: 'white'}} >
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Camera>
                                </View>
                            )

                            : (

                                <Container style={{flex:1 }}>
                                    <Header androidStatusBarColor="#000000" style={{ backgroundColor: "white"}}>
                                        <Left>
                                            <TouchableHighlight
                                                onPress={this.Redirect}
                                            >
                                                <Ionicons color='black' style={{paddingLeft:10}} name="ios-arrow-back" size={24} />
                                            </TouchableHighlight>
                                        </Left>
                                        <Body>
                                            <Text style={{fontFamily: 'OldStandardTT-italic',
                                                fontSize: 20}}>Post a Gram</Text>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity onPress={this.startPost}>
                                            <Ionicons color='black' style={{paddingRight:10}} name="ios-paper-plane" size={24} />
                                            </TouchableOpacity>
                                        </Right>
                                    </Header>

                                    <Content>

                                        <View style ={styles.container}>

                                            <Image source={{uri:'https://media1.popsugar-assets.com/files/thumbor/clRf9KgfU0gfeTvymRwWzrDwJ0w/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2013/01/01/5/192/1922398/b578254fe6d36c92_Usher_Raymond/i/Usher.jpg'}} style={styles.avatar}></Image>

                                            <Text style={[styles.text, { fontWeight: "200", fontSize: 24 }]}>{this.props.auth.currentUserData.handle}</Text>

                                        </View>

                                        {this.state.isLoading? ( <Spinner color='#BD0ADA' />) : (
                                            <View>
                                                <View style={{flexDirection:'row', marginLeft: 32}}>
                                                    <TextInput onChangeText={(text)=> this.setState({text: text})} autoFoucs={true} multiline={true} numberOfLines={4} style={{flex:1, fontSize: 16, fontFamily: 'OldStandardTT-Regular'}} placeholder="What's the latest?"></TextInput>
                                                </View>


                                                <View>

                                                    {this.state.video ?(     <View style={styles.imageContainer}>
                                                        <Video
                                                            source={this.state.image ? {uri: this.state.image } : null}
                                                            rate={1.0}
                                                            volume={1.0}
                                                            isMuted={false}
                                                            shouldPlay={false}
                                                            isLooping={false}
                                                            useNativeControls
                                                            resizeMode="cover"
                                                            style={{ height: 300,alignItems:'center' }}
                                                        />
                                                    </View>):( <View style={styles.imageContainer}>
                                                        <Image source={this.state.image ? {uri: this.state.image } : null} style={styles.displayImage}></Image>

                                                    </View>)}


                                                </View>
                                            </View>
                                        )}


                                    </Content>
                                    <Footer>
                                        <FooterTab style={{ backgroundColor: "white" }}>
                                            <Button onPress={ this.openCamera  } vertical>
                                                <Ionicons color='black' name="ios-camera" size={24} />
                                                <Text style={{fontFamily: 'OldStandardTT-Regular'}}>Picture</Text>
                                            </Button>
                                            <Button onPress={ this.openImageLibrary  } vertical>
                                                <Ionicons color='black' name="ios-photos" size={24} />
                                                <Text style={{fontFamily: 'OldStandardTT-Regular'}}>Gallery</Text>
                                            </Button>
                                            <Button onPress={this.loadCamera}
                                                    vertical>
                                                <Ionicons color='black' name="ios-videocam" size={24} />
                                                <Text style={{fontFamily: 'OldStandardTT-Regular'}}>Video</Text>
                                            </Button>

                                        </FooterTab>
                                    </Footer>
                                </Container>

                            )}

                                </Modal>
                                    </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth
    }
}
//const wrapper = compose(
 //   connect(mapStateToProps),
//    connectActionSheet
//)

export default connect(mapStateToProps)(ModalView);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        height:700,
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        fontFamily: "OldStandardTT-Regular",
        color: "#52575D"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    containerInput:{
        flex:1
    },
    container:{
        margin:32,
        flexDirection:"row"
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,


    },
    photo:{
        alignItems: "flex-end",
        marginHorizontal:32
    },
    imageContainer:{
        marginTop:32,
        height:300,

    },
    displayImage:{
        width:'100%',
        height:'100%'

    }
});
