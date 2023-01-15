import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';

import FontIcon from 'react-native-vector-icons/FontAwesome5';
export default ModalInput = ({submitRating, score}) => {
  const [rating, setRating] = useState(score);

  const [error, setError] = useState('');

  function checkInput(rating) {
    if (rating === '') {
      setError('Please fill in a rating');
    } else {
      submitRating(rating);
    }
  }
  console.log('score volgens de modal ', score);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        zIndex: 100,
        height: Dimensions.get('window').height,
      }}>
      <View style={[styles.modal, globalStyles.shadow]}>
        <Image
          style={styles.imageModal}
          source={require('../assets/images/logo-lg.png')}
          resizeMode="contain"
        />
        <Text style={styles.textModal}>
          Thanks for sharing your opinion with us!
        </Text>
        <TextInput
          style={[
            globalStyles.textInput,
            styles.text,
            {width: Dimensions.get('window').width * 0.4, marginBottom: 15},
          ]}
          // placeholder="Fill in the instruction."
          placeholderTextColor={colors.textcolor}
          keyboardType="numeric"
          value={rating}
          maxLength={1}
          multiline={true}
          onChangeText={value => setRating(value.replace(/[^0-9]/g, ''))}
        />
        <FontIcon
          name="star"
          size={20}
          solid
          color={colors.secondarycolor}
          style={{
            position: 'absolute',
            bottom: 140,
            right: 100,
          }}
        />
        <TouchableOpacity
          style={[
            globalStyles.buttonModal,
            styles.text,
            { marginBottom: 40},
          ]}
          onPress={() => checkInput(rating)}>
          <Text style={styles.textButtonModal}>Add rating</Text>
        </TouchableOpacity>
        {error && (
          <Text
            style={[
              globalStyles.error,
              {
                position: 'absolute',
                bottom: 10,
              },
            ]}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: colors.backgroundcolor,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    top: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  imageModal: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
  },
  textModal: {
    color: colors.textcolor,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.6,
    padding: 20,
    fontSize: 18,
  },

  buttonModal: {
    backgroundColor: colors.maincolor,
    padding: 15,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.4,
  },
  textButtonModal: {color: '#fff', textAlign: 'center', fontSize: 18},
});
