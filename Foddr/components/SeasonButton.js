import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../theme/colors';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import GetLocation from 'react-native-get-location';

const SeasonButton = ({
  imgUrl,
  enabled,
  color,
  colorBackground,
  talkToParent,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        talkToParent([id, !enabled]);
      }}
      style={
        enabled
          ? [
              styles.buttonLocation,
              {backgroundColor: colorBackground, borderColor: color},
            ]
          : [
              styles.buttonLocation,
              {backgroundColor: '#fff', borderColor: color},
            ]
      }>
      <Image source={imgUrl} style={styles.userLocation} />
    </TouchableOpacity>
  );
};
const styles = {
  buttonLocation: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    // borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#000',
  },
  userLocation: {
    width: 30,
    height: 30,
  },
};
export default SeasonButton;
