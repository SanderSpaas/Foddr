import React, {Component} from 'react';
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
import colors from '../theme/colors';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

const Rating = ({rating}) => {
  return (
    <View style={styles.rating}>
      <FontIcon name="star" size={15} solid color={colors.secondarycolor} />
      <Text style={styles.ratingText}>
        {(rating[0] / rating[1]).toFixed(1)}
      </Text>
    </View>
  );
};
const styles = {
  rating: {
    flexDirection: 'row',
    borderColor: colors.secondarycolor,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    padding: 3,
    marginLeft: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 65,
    color: colors.secondarycolor,
    position: 'absolute',
    bottom: 40,
  },
  ratingText: {
    color: colors.textcolor,
  },
};
export default Rating;
