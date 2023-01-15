import React from 'react';
import {
  Dimensions, Image, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
export default Modal = ({cleanUp}) => {
  return (
    <>
      <View style={styles.modalBackdrop}></View>
      <View style={[styles.modal, globalStyles.shadow]}>
        <Image
          style={styles.imageModal}
          source={require('../assets/images/logo-lg.png')}
          resizeMode="contain"
        />
        <Text style={styles.textModal}>
          Thank you for sharing your epic recipe with us!
        </Text>
        <TouchableOpacity style={styles.buttonModal} onPress={() => cleanUp()}>
          <Text style={styles.textButtonModal}>Check it out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.backgroundcolor,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    top: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.5,
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
