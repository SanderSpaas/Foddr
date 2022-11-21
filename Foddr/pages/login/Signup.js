import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import colors from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  defaultMessages,
  defaultRules,
  FieldsToValidate,
  useValidation,
} from 'react-simple-form-validator';
interface FunctionFormProps {
  validation: FieldsToValidate;
}

const Signup = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  function signup() {
    //clearing errors
    setError('');
    // Checking if input is empty
    if (email.trim().length === 0 || password.trim().length === 0) {
      console.log('Please fill in all fields');
      setError('Please fill in all fields');
    } else {
      console.info('trying to log you in ' + email + ' ' + password);
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        // .then(
        //   firestore()
        //     .collection('users')
        //     .doc(auth().currentUser.uid)
        //     .set({
        //       email: email.trim,
        //     })
        //     //ensure we catch any errors at this stage to advise us if something does go wrong
        //     .catch(error => {
        //       console.log(error);
        //       console.log(
        //         'Something went wrong with added user to firestore: ',
        //         error,
        //       );
        //     }),
        // )
        // Successful sign in is handled by firebase.auth().onAuthStateChanged
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            // console.log('That email address is already in use!');
            setError('Email is already in use');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setError('Invalid email');
          }

          if (error.code === 'auth/weak-password') {
            console.log('Password too weak!');
            setError('Passsword is too weak');
          }

          console.log(error.code);
        });
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {loading !== false ? (
        <>
          <Image
            source={require('../../assets/images/loader.gif')}
            style={styles.loader}
          />
          <View style={styles.loaderframe}></View>
        </>
      ) : (
        <></>
      )}
      <Image
        style={styles.blob}
        source={require('../../assets/images/wave.png')}
      />
      <TouchableHighlight
        style={styles.backbutton}
        onPress={() => {
          navigation.navigate('LoginChooser');
        }}>
        <FontIcon name="arrow-left" size={30} solid color={'#333333'} />
      </TouchableHighlight>
      <View>
        <Text style={styles.title}>Hi!</Text>
        <Text style={styles.subtitle}>Create new account</Text>
      </View>
      <TextInput
        id="email"
        style={styles.input}
        placeholder="Email"
        onChangeText={value => setEmail(value)}
        // value={email}
        value="test@gmail.com"
      />
      <TextInput
        id="password"
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        onChangeText={value => setPassword(value)}
        // value={password}
        value="Azerty123"
      />
      <TouchableHighlight
        style={styles.loginButton}
        onPress={() => {
          signup();
        }}>
        <Text style={styles.textcolor}>Sign up</Text>
      </TouchableHighlight>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.bottemText}>
        <Text>Already have an account? </Text>
        <TouchableHighlight
          style={styles.link}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.link}>Log in.</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCF9F2',
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    marginBottom: -15,
  },
  error: {
    backgroundColor: colors.quatrarycolor,
    color: '#fff',
    padding: 10,
    width: Dimensions.get('window').width * 0.5,
    textAlign: 'center',
    borderRadius: 5,
  },
  backbutton: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    backgroundColor: '#fff',
    padding: 10,
    width: 50,
    borderRadius: 40,
  },
  loginButton: {
    backgroundColor: colors.maincolor,
    width: Dimensions.get('window').width * 0.5,
    padding: 15,
    borderRadius: 5,
    marginBottom: 50,
  },
  textcolor: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderBottomColor: colors.secondarycolor,
    borderBottomWidth: 5,
    width: Dimensions.get('window').width * 0.5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.textcolor,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    color: colors.textcolor,
    marginBottom: 50,
  },
  bottemText: {
    flexDirection: 'row',
    marginBottom: 25,
    borderTopColor: colors.secondarycolor,
    borderTopWidth: 5,
    paddingTop: 15,
    width: Dimensions.get('window').width * 0.6,
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
    width: 100,
    height: 100,
    borderRadius: 25,
    zIndex: 3,
    backgroundColor: '#fff',
  },
  loaderframe: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 2,
    backgroundColor: '#C0C0C0',
    opacity: 0.4,
  },
});
export default Signup;
