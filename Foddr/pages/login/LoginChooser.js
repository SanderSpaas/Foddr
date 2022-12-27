import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../theme/globalStyles.js';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    width: Dimensions.get('window').width * 0.7,
    height: 240,
  },
  loginButton: {
    backgroundColor: colors.maincolor,
    marginBottom: 25,
  },
  signupButton: {
    backgroundColor: colors.quatrarycolor,
  },
});

const LoginChooser = () => {
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
      <View>
        <TouchableOpacity
          style={[globalStyles.buttonMedium, styles.loginButton]}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.buttonMedium, styles.signupButton]}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={globalStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginChooser;
