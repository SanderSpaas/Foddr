// import 'react-native-gesture-handler';
import React from 'react';
import {
  Dimensions, Image, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import colors from '../theme/colors';
var ImagePicker = require('react-native-image-picker');

function Camera({handleUri, uri}) {
  let options = {
    saveToPhotos: true,
    includeBase64: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // console.log('response', JSON.stringify(response));
        handleUri(response.assets[0].uri, response.assets[0].base64);
      }
    });
  };

  launchImageLibrary = () => {
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // console.log('response', JSON.stringify(response));
        handleUri(response.assets[0].uri, response.assets[0].base64);
      }
    });
  };

  function renderFileUri() {
    if (uri) {
      return <Image source={{uri: uri}} style={styles.picture} />;
    } else {
      return <Image style={styles.picture} />;
    }
  }

  return (
    <>
      <TouchableOpacity onPress={launchImageLibrary} style={styles.border}>
        {renderFileUri()}
        <Text style={styles.absoluteText}>Image</Text>
      </TouchableOpacity>
      <View style={styles.buttonBar}>
        <TouchableOpacity
          onPress={launchImageLibrary}
          style={styles.btnSection}>
          <Text style={styles.btnText}>Choose picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={launchCamera} style={styles.btnSection}>
          <Text style={styles.btnText}>Take picture</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.8,
  },
  btnText: {
    backgroundColor: colors.maincolor,
    padding: 15,
    color: '#fff',
    borderRadius: 20,
    fontSize: 16,
    width: 140,
    textAlign: 'center',
    marginTop: 25,
  },
  absoluteText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
    fontSize: 35,
    color: '#000',
  },
  border: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'dashed',
    borderRadius: 20,
    marginTop: 25,
    width: Dimensions.get('screen').width * 0.8,
  },
  picture: {
    height: 200,
    borderRadius: 20,
    zIndex: 2,
  },
});
export default Camera;
