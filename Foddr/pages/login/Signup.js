import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import colors from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import globalStyles from '../../theme/globalStyles.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  function signup() {
    //clearing errors
    setError('');
    // Checking if input is empty
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0
    ) {
      console.log('Please fill in all fields');
      setError('Please fill in all fields');
    } else {
      console.info('trying to log you in ' + email + ' ' + password);
      // try {
      //   AsyncStorage.setItem('name', name);
      // } catch (error) {
      //   // Error saving data
      //   console.log(error);
      // }
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
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
    <ScrollView contentContainerStyle={globalStyles.root}>
      {loading !== false ? (
        <>
          <Image
            source={require('../../assets/images/loader.gif')}
            style={globalStyles.loader}
          />
          <View style={globalStyles.loaderframe}></View>
        </>
      ) : (
        <></>
      )}
      <Image
        style={globalStyles.blob}
        source={require('../../assets/images/wave.png')}
      />
      <TouchableOpacity
        style={globalStyles.backbutton}
        onPress={() => {
          navigation.navigate('LoginChooser');
        }}>
        <FontIcon name="arrow-left" size={30} solid color={'#333333'} />
      </TouchableOpacity>
      <View>
        <Text style={globalStyles.title}>Hi!</Text>
        <Text style={globalStyles.subtitle}>Create new account</Text>
      </View>
      <View>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput
          id="name"
          style={globalStyles.textInput}
          placeholder="Name"
          onChangeText={value => setName(value)}
          // value={email}
          value="testUser"
        />
      </View>
      <View>
        <Text style={globalStyles.label}>Email</Text>
        <TextInput
          id="email"
          style={globalStyles.textInput}
          placeholder="Email"
          onChangeText={value => setEmail(value)}
          // value={email}
          value="test@gmail.com"
        />
      </View>
      <View>
        <Text style={globalStyles.label}>Enter the password</Text>
        <TextInput
          id="password"
          style={globalStyles.textInput}
          secureTextEntry
          placeholder="Password"
          onChangeText={value => setPassword(value)}
          // value={password}
          value="Azerty123"
        />
      </View>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => {
          signup();
        }}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      {error && <Text style={globalStyles.error}>{error}</Text>}
      <View style={globalStyles.bottemText}>
        <Text style={globalStyles.text}>Already have an account? </Text>
        <TouchableOpacity
          style={globalStyles.link}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={[globalStyles.text, globalStyles.link]}>Log in.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Signup;
