import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import {
  Image,
  ScrollView, StatusBar, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import BackButton from '../../components/BackButton.js';
import Loader from '../../components/Loader.js';
import colors from '../../theme/colors.js';
import globalStyles from '../../theme/globalStyles.js';

const Login = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  function login() {
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
        .signInWithEmailAndPassword(email.trim(), password.trim())
        // Successful sign in is handled by firebase.auth().onAuthStateChanged in App.js! :)
        .catch(error => {
          setLoading(false);

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setError('Invalid email');
          }

          if (error.code === 'auth/user-not-found') {
            console.log('That user wasnt found!');
            setError('Invalid user/email');
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
          <Text style={globalStyles.title}>Welcome!</Text>
          <Text style={globalStyles.subtitle}>Sign in to continue</Text>
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
            login();
          }}>
          <Text style={globalStyles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        {error && <Text style={globalStyles.error}>{error}</Text>}
        <View style={globalStyles.bottemText}>
          <Text style={globalStyles.text}>Don't have an account? </Text>
          <TouchableOpacity
            style={globalStyles.link}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={[globalStyles.text, globalStyles.link]}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Login;
