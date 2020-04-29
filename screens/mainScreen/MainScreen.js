import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

export default function MainScreen() {
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
       ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
        : undefined);

    const test = '';

    return (
        <View style={{ padding: 10, marginTop: 10 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={styles.headerText}>What's your phone number?</Text>
            <View style={{ height: 50,
                flexDirection: 'row',
                margin: 5}}>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17, borderColor: 'red', borderWidth: 0.5, flex:1 }}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
            </View>
            <TouchableOpacity style={{alignItems:'center'}}  disabled={!phoneNumber} onPress={async () => {
                // The FirebaseRecaptchaVerifierModal ref implements the
                // FirebaseAuthApplicationVerifier interface and can be
                // passed directly to `verifyPhoneNumber`.
                try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                        phoneNumber,
                        recaptchaVerifier.current
                    );
                    setVerificationId(verificationId);
                    showMessage({
                        text: "Verification code has been sent to your phone.",


                    });
                } catch (err) {
                    showMessage({ text: `Error: ${err.message}`, color: "red" });
                }
            }}>
                <View style={styles.button}>
                <Text style={styles.buttonText}>
                    Send Verification Code
                </Text>
                </View>
            </TouchableOpacity>

            <Text style={{ marginTop: 20, textAlign: 'center' }}>Enter Verification code</Text>
            <View style={{alignItems: 'center'}}>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            </View>

            <TouchableOpacity style={{alignItems:'center'}} disabled={!verificationId}
                              onPress={async () => {
                                  try {
                                      const credential = firebase.auth.PhoneAuthProvider.credential(
                                          verificationId,
                                          verificationCode
                                      );
                                      await firebase.auth().signInWithCredential(credential);
                                      showMessage({ text: "Phone authentication successful 👍" });
                                  } catch (err) {
                                      showMessage({ text: `Error: ${err.message}`, color: "red" });
                                  }
                              }}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Confirm Verification Code</Text>
                </View>
            </TouchableOpacity>

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
        fontWeight:'bold',

    }
});