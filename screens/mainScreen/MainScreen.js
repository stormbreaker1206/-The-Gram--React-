import React from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import {getCurrentTime, randomName} from "../../helpers/userUtilis";
import {connect} from 'react-redux';
import {MESSAGE} from '../../helpers/TextMessage'
import {userNotification} from '../../helpers/firebaseHelpers'
import {Button} from "react-native-paper";

const MainScreen = ({signIn, GetCurrentData}) => {
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const [showButton, setButton]= React.useState(true);
    const [message, showMessage] = React.useState(null);
    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const isMountedRef = React.useRef(false);
    const time = ()=>{
        alert(getCurrentTime())
        let time = getCurrentTime();
        let r = time.toString()
      //  console.log(getCurrentTime().toString())
      //  console.log(r)
      //  console.log(new Date('Sun May 03 2020 10:47:15 GMT-0500 '))


    }

    return (
        <View style={{ padding: 10, marginTop: 10, backgroundColor: 'white' , flex:1}}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />

            {
                showButton ? (
                <View>
                    <Text style={styles.headerText}>What's your phone number?</Text>

                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+1 999 999 9999"
                            autoFocus
                            autoCompleteType="tel"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)
                            }
                        />
                    </View>
                    <TouchableOpacity style={{alignItems:'center'}}  disabled={!phoneNumber} onPress={
                        async () => {
                            // The FirebaseRecaptchaVerifierModal ref implements the
                            // FirebaseAuthApplicationVerifier interface and can be
                            // passed directly to `verifyPhoneNumber`.
                            isMountedRef.current = true;

                            try {


                                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                    const verificationId = await phoneProvider.verifyPhoneNumber(
                                        phoneNumber,
                                        recaptchaVerifier.current
                                    );
                                if(isMountedRef.current) {
                                    setVerificationId(verificationId);
                                }


                                showMessage({
                                    text: "Tap and enter the verification code that has been sent to your phone.",


                                });
                                setButton(false);
                                return () => isMountedRef.current = false;
                            } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: "red" });

                            }
                        }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Send verification Code
                            </Text>

                        </View>
                    </TouchableOpacity>

                    <View style={styles.messageCodeContainer}>
                        <Text style={styles.messageCodeText}>
                            By tapping "Send verification above" we
                            will send you a SMS to comfirm your phone number.
                            Message & data rates may apply.
                        </Text>
                    </View>
                </View>
            ) : null}


            {showButton ? null: (

                <View>
                    <Text style={styles.headerText}>What's your verification code</Text>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            editable={!!verificationId}
                            placeholder="123456"
                            onChangeText={setVerificationCode}
                        />
                    </View>

                    <TouchableOpacity style={{alignItems:'center'}} disabled={!verificationId}
                                      onPress={async () => {
                                        //  isMountedRef.current = true;
                                          try {
                                              const credential = firebase.auth.PhoneAuthProvider.credential(
                                                  verificationId,
                                                  verificationCode
                                              );


                                           const response =  await firebase.auth().signInWithCredential(credential);

                                           if(response){

                                                       // console.log(response)

                                                   //check if user already exist
                                                   const snapshot = await firebase
                                                       .database()
                                                       .ref('users')
                                                       .child(response.user.uid)
                                                       .on('value', (res) =>{

                                                           if(res.exists()){

                                                                 signIn(response.user)

                                                           }else {


                                                               let proPic = 'https://sm.mashable.com/mashable_in/seo/1/18439/18439_qjcp.jpg';
                                                               //store information in the database and sign in
                                                               const user =  firebase.database().ref('users')
                                                                   .child(response.user.uid).set({datJoined:getCurrentTime().toString(),
                                                                       encrypted:randomName(5), handle:randomName(6),
                                                                       id:response.user.uid,phone:phoneNumber, image:proPic, directMessage: true, profilePrivacy:false, notification:true, autoDelete: false})

                                                                 signIn(response.user)

                                                                userNotification("The Gram", MESSAGE, response.user.uid, proPic, false)
                                                           }
                                                       })

                                               }



                                              showMessage({ text: "Phone authentication successful 👍" });
                                            //  return () => isMountedRef.current = false;
                                          } catch (err) {
                                              showMessage({ text: `Error: ${err.message}`, color: "red" });
                                          }
                                      }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Confirm Verification Code</Text>
                        </View>
                    </TouchableOpacity>


                </View>

            )}



            {message ? (
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
                    onPress={() => showMessage(undefined)}>
                    <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : undefined}
        </View>
    );
}
const mapDispatchToprops = dispatch =>{
    return{
        signIn: user => dispatch({type:'SIGN_IN', payload:user}),
        GetCurrentData: data => dispatch({type:'GET_USER_DATA', payload:data})

    }

}
export default connect(null, mapDispatchToprops) (MainScreen);


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
        color:'black',
        fontWeight:'100',
        fontSize: 16,
        textAlign:'center',
        fontFamily: 'OldStandardTT-Regular'
    },
    headerText:{
        textAlign: 'center',
        fontFamily: 'OldStandardTT-Regular',
        fontSize: 24,
        fontWeight:'100',

    },
    textInput:{
        marginVertical: 10, fontSize: 17, borderColor: 'black', borderWidth: 0.5, flex:1, borderRadius: 5
    },
    textInputView:{
    height: 60,
    flexDirection: 'row',
    margin: 5
    
    },
    messageCodeContainer:{
        marginTop: 5,
        padding: 5,
        flex:1,
        alignItems: 'center',
    },
    messageCodeText:{
        textAlign: 'center',
        fontFamily: 'OldStandardTT-Regular',
        fontSize: 17
    }
});