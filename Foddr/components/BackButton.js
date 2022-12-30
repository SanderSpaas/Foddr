import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
export default BackButton => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        navigation.goBack();
      }}>
      <FontIcon style={styles.arrow} name="arrow-left" size={20} solid />
      <View style={styles.arrowBackdrop}></View>
    </TouchableOpacity>
  );
};
styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    zIndex: 4,
    margin: 20,
  },
  arrowBackdrop: {
    padding: 20,
    backgroundColor: '#000',
    opacity: 0.4,
    borderRadius: 50,
  },
  arrow: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 4,
    color: '#fff',
  },
});
