import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton.js';
import Loader from '../../components/Loader.js';
import colors from '../../theme/colors.js';
import globalStyles from '../../theme/globalStyles.js';
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
      try {
        AsyncStorage.setItem('name', name);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
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
          } else {
            setError(error.code);
          }
          console.log(error.code);
        });
    }
  }
  return (
    <>
      <StatusBar backgroundColor={colors.maincolor} />
      <ScrollView contentContainerStyle={globalStyles.root}>
        <Loader loading={loading} />
        <Image
          style={globalStyles.blob}
          source={require('../../assets/images/wave.png')}
        />
        <View
          style={{
            position: 'absolute',
            top: 18,
            left: 0,
            margin: 10,
          }}>
          <BackButton />
        </View>
        <View>
          <Text style={[globalStyles.title, {maxWidth: 200}]} numberOfLines={1}>
            Hey {name}
          </Text>
          <Text style={globalStyles.subtitle}>Create new account</Text>
        </View>
        <View>
          <Text style={globalStyles.label}>Name</Text>
          <TextInput
            id="name"
            style={globalStyles.textInput}
            onChangeText={value => setName(value)}
          />
        </View>
        <View>
          <Text style={globalStyles.label}>Email</Text>
          <TextInput
            id="email"
            style={globalStyles.textInput}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View>
          <Text style={globalStyles.label}>Password</Text>
          <TextInput
            id="password"
            style={globalStyles.textInput}
            secureTextEntry
            onChangeText={value => setPassword(value)}
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
    </>
  );
};
export default Signup;
