import React, {useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import colors from '../theme/colors';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Like from './Like';
import SVGImg from '../assets/images/gradient.svg';
import {useNavigation} from '@react-navigation/native';
import Rating from './Rating';
const ImageHeader = ({recipeData, route, scrollY, scrollYSticky}) => {
  // const [scrollYComp, setScrollYComp] = useState(
  //   new Animated.Value(scrollY),
  // );
  const navigation = useNavigation();
  const height = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [250, 125],
    extrapolate: 'clamp',
  });

  // scrollYStickyOffset.setOffset(200);
  console.log('scrollY', scrollY);
  return (
    <Animated.View
      style={[
        {height: height},
        styles.imagecontainer,
        {
          position: 'absolute',
          top: scrollYSticky,
          // top: 100,
          left: 0,
          right: 0,
          height: height,
        },
      ]}>
      <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}>
        <>
          <FontIcon style={styles.arrow} name="arrow-left" size={20} solid />
          <View style={styles.arrowBackdrop}></View>
        </>
      </TouchableHighlight>
      <View style={styles.likeContainer}>
        <Like likes={recipeData.likes} recipeId={route.params.id} />
      </View>
      <Text style={styles.titleText} numberOfLines={1}>
        {recipeData.name}
      </Text>
      <Text style={styles.timeText}>{recipeData.time}min</Text>
      <Animated.Image
        style={[styles.image, {height: height}]}
        source={{uri: recipeData.image}}
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

      {/* <Animated.View style={{position: 'absolute'}}> */}
      <View style={styles.titleBar}>
        <Text style={styles.barText}>
          {recipeData.forPeople}
          <FontIcon
            // style={styles.arrow}
            name="portrait"
            size={25}
            color={colors.secondarycolor}
          />

          {/* Recipe ❤️ {route.params.id} */}
          <Rating
            rating={[
              recipeData.rating.rating,
              recipeData.rating.amountOfRatings,
            ]}
          />
        </Text>
        {/* <NumericInput
                minValue={1}
                type="up-down"
                onChange={value => console.log(value)}
              /> */}
      </View>
      <Image
        style={[styles.blob]}
        source={require('../assets/images/wave.png')}
      />
      {/* </Animated.View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    position: 'absolute',
    // height: 200,
    zIndex: 2,
  },
  overlay: {
    zIndex: 3,
  },
  image: {
    width: Dimensions.get('window').width,
    flex: 1,
    // minHeight: 100,
    // maxHeight: 200,
    position: 'absolute',
  },
  titleText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 4,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  timeText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 4,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    zIndex: 4,
    margin: 20,
  },
  arrowBackdrop: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#000',
    opacity: 0.4,
    borderRadius: 50,
  },
  arrow: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 4,
    color: '#fff',
  },
  likeContainer: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },
  titleBar: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 3,
    // position: 'absolute',
    height: 50,
    zIndex: 2,
    position: 'absolute',
    bottom: -90,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    marginBottom: -15,
    // zIndex: 10,
    position: 'absolute',
    bottom: -90,
  },
});
export default ImageHeader;
