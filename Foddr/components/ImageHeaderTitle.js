import React from 'react';
import {
  Animated, Dimensions, StyleSheet,
  Text
} from 'react-native';
import SVGImg from '../assets/images/gradient.svg';
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
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: scrollYSticky,
            height: height,
            overflow: 'hidden',
          },
        ]}>
        <SVGImg
          style={styles.overlay}
          // style={[styles.overlay,{height: height}]}
          width={Dimensions.get('window').width}
          height={250}
          resizeMode="stretch"
        />
      </Animated.View>
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
});
export default ImageHeaderTitle;
