// import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
var ImagePicker = require('react-native-image-picker');

import FontIcon from 'react-native-vector-icons/FontAwesome5';
const Camera = ({saveOnline, uri, name, isLoading}) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const width = Dimensions.get('window').width;
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
        saveOnline(response.assets[0].base64);
        setButtonVisible(!buttonVisible);
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
        saveOnline(response.assets[0].base64);
        setButtonVisible(!buttonVisible);
      }
    });
  };

  function renderFileUri() {
    if (isLoading) {
      return (
        <View
          style={[
            {
              position: 'absolute',
              width: 150,
              height: 150,
              backgroundColor: 'white',
              borderRadius: 200,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Image
            source={require('../assets/images/loader.gif')}
            style={[
              globalStyles.loader,
              {
                width: 125,
                height: 125,
              },
            ]}
          />
        </View>
      );
    }
    if (uri) {
      return <Image source={{uri: uri}} style={[styles.picture]} />;
    } else {
      return (
        <Image
          style={[
            styles.picture,
            {
              zIndex: 0,
              elevation: 0, // Android
            },
          ]}
          source={require('../assets/images/pfPicture.png')}
        />
      );
    }
  }

  return (
    <>
      <View
        // onPress={launchImageLibrary}
        style={styles.border}>
        {renderFileUri()}
      </View>
      <TouchableOpacity
        onPress={() => {
          setButtonVisible(!buttonVisible);
        }}
        style={{
          position: 'absolute',
          top: 50,
          left: 180,
          padding: 10,
          backgroundColor: 'white',
          borderWidth: 5,
          borderColor: colors.quatrarycolor,
          borderRadius: 200,
          zIndex: 5,
          elevation: 5, // Android
        }}>
        <FontIcon name="camera" color={colors.gray} size={30} solid />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          width: width * 0.5,
          justifyContent: 'center',
        }}>
        <Text style={globalStyles.text}>Hi </Text>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>{name}</Text>
        <Text style={globalStyles.text}>!</Text>
      </View>

      <View style={[buttonVisible ? styles.buttonBar : {display: 'none'}]}>
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
};
const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.5,
  },
  btnText: {
    backgroundColor: colors.maincolor,
    padding: 10,
    color: '#fff',
    borderRadius: 20,
    fontSize: 14,
    width: 115,
    textAlign: 'center',
  },
  absoluteText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
    fontSize: 35,
    color: '#000',
  },
  border: {
    width: 160,
    height: 160,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.quatrarycolor,
    borderRadius: 200,
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 200,
    zIndex: 2,
    elevation: 2, // Android
  },
});
export default Camera;
