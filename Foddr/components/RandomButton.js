import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../theme/colors';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import GetLocation from 'react-native-get-location';

const RandomButton = ({ mapViewRef, recipeData }) => {
  function getRandomLocation() {
    // console.log(recipeData);
    let recipeObj =
      recipeData[Math.floor(Math.random() * (recipeData.length - 0) + 0)];
    // console.log(
    //   recipeData[Math.floor(Math.random() * (recipeData.length - 0) + 0)]
    //     .recipe,
    // );
    let regionObj = {
      latitude: parseFloat(recipeObj.recipe.latitude),
      longitude: parseFloat(recipeObj.recipe.longitude),
      latitudeDelta: 1,
      longitudeDelta: 1,
    };
    mapViewRef.current?.animateToRegion(regionObj, 2000);
  }
  return (
    <TouchableOpacity
      onPress={() => {
        getRandomLocation();
      }}
      style={styles.button}>
      <FontIcon
        style={styles.location}
        name="dice-two"
        size={30}
        solid
        color={colors.textcolor}
      />
    </TouchableOpacity>
  );
};
const styles = {
  button: {
    borderRadius: 500,
    padding: 5,
    width: 125,
    height: 150,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -50,
    left: (Dimensions.get('window').width * 0.5) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#000',
    // width: Dimensions.get('window').width * 0.5,
  },
  location: {
    // position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
    // left: Dimensions.get('window').width * 0.5 - 70,
  },
};
export default RandomButton;
