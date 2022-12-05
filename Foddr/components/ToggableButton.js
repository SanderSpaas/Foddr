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
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

const auth = firebase.auth();
const {uid} = auth.currentUser;
// let likesArray;
let counter = 0;
// const db = firebase.firestore();

const ToggableButton = ({text, color, talkToParent}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  function handleClick() {
    setIsEnabled(!isEnabled);
    // console.log('am i on?: ' + isEnabled);
    talkToParent([text, isEnabled]);
  }
  return (
    <TouchableOpacity
      style={
        isEnabled
          ? [styles.card, {borderColor: color}]
          : [styles.card, {backgroundColor: color, borderColor: color}]
      }
      onPress={() => {
        handleClick();
      }}>
      <>
        <Text
          style={isEnabled ? styles.text : [styles.text, styles.textSelected]}>
          {text}
        </Text>
      </>
    </TouchableOpacity>
  );
};

ToggableButton.defaultProps = {
  color: '#008bea',
  text: 'i am text',
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.45,
    height: 75,
    borderWidth: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: colors.textcolor,
    fontSize: 18,
  },
  textSelected: {
    color: colors.backgroundcolor,
  },
});
export default ToggableButton;
