import React from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
const ImageHeaderTitle = ({title, scrollY, scrollYSticky, imgUrl}) => {
  const height = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [250, 125],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        {height: height},
        styles.imagecontainer,
        {
          position: 'absolute',
          top: scrollYSticky,
          left: 0,
          right: 0,
          height: height,
        },
      ]}>
      <Text style={styles.titleText} numberOfLines={1}>
        {title}
      </Text>
      <Animated.Image
        style={[
          styles.image,
          {
            height: height,
            zIndex: 2,
            width: Dimensions.get('window').width,
            position: 'absolute',
            top: 0,
          },
        ]}
        source={imgUrl}
        resizeMode="cover"
      />
      <LinearGradient
        locations={[0, 1.0]}
        colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']}
        style={styles.linearGradient}></LinearGradient>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  imagecontainer: {
    position: 'absolute',
    zIndex: 2,
  },
  overlay: {
    zIndex: 3,
  },
  image: {
    width: Dimensions.get('window').width,
    flex: 1,
    position: 'absolute',
  },
  titleText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 4,
    fontWeight: 'bold',
    fontSize: 25,
    padding: 20,
    color: '#fff',
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
});
export default ImageHeaderTitle;
