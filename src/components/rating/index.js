import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'

class Rating extends Component {
    render() {
        return (
            <View style={styles.rating}>
          <FontIcon name="star" size={15} solid color={'#64578A'} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        );
    }
}

export default Rating;