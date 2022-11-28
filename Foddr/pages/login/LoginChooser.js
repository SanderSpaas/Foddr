import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
} from 'react-native';
// import Button from '../../components/Button/Button.js';
import colors from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.backgroundcolor,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textcolor,
    width: Dimensions.get('window').width * 0.8,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 330,
  },
  button: {
    width: 192,
    height: 48,
    padding: 15,
    borderRadius: 5,
    //shadows 😎
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  loginButton: {
    backgroundColor: colors.maincolor,
  },
  textcolor: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    // fontSize: 15,
  },
  signupButton: {
    backgroundColor: colors.quatrarycolor,
  },
  textcolorSignup: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    // fontSize: 20,
  },
});

const LoginChooser = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image
        style={styles.image}
        source={require('../../assets/images/logo-lg.png')}
      />
      <Text style={styles.title}>
        Ready to explore far away gourmet and cultural masterpieces?
      </Text>
      <TouchableHighlight
        style={[styles.button, styles.loginButton]}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.textcolor}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, styles.signupButton]}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={styles.textcolorSignup}>Sign up</Text>
      </TouchableHighlight>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
      <TouchableHighlight
        style={styles.signupButton}
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        <Text style={styles.textcolorSignup}>logout</Text>
      </TouchableHighlight>
    </View>
  );
};

export default LoginChooser;
