import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

export default Loader = loading => {
  return (
    <>
      {loading === true && (
        <>
          <Image
            source={require('../assets/images/loader.gif')}
            style={styles.loader}
          />
          <View style={styles.loaderframe}></View>
        </>
      )}
    </>
  );
};
styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
    width: 175,
    height: 150,
    borderRadius: 25,
    padding: 60,
    zIndex: 9,
    elevation: 9,
    left: Dimensions.get('window').width / 2 - 87.5,
    top: Dimensions.get('window').height / 2 - 100,

    backgroundColor: '#fff',
  },
  loaderframe: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 2,
    backgroundColor: '#C0C0C0',
    opacity: 0.4,
  },
});
