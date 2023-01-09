
import React, { useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import SVGImg from '../assets/images/gradient.svg';
import colors from '../theme/colors';
import BackButton from './BackButton';
import Like from './Like';
import Rating from './Rating';
import SeasonButton from './SeasonButton';
const fallImg = '../assets/images/fallIcon.png';
const winterImg = '../assets/images/winterIcon.png';
const springImg = '../assets/images/springIcon.png';
const summerImg = '../assets/images/summerIcon.png';
const ImageHeader = ({
  recipeData,
  route,
  scrollY,
  scrollYSticky,
  talkToParent,
}) => {
  const [amountOfPeople, setAmountOfPeople] = useState(
    parseInt(recipeData.amountOfPeople),
  );
  const handleIncrease = () => {
    let people = amountOfPeople;
    people++;
    setAmountOfPeople(people);
    talkToParent(people);
    // console.log('amountOfPeople', amountOfPeople);
  };

  const handleDecrease = () => {
    let people = amountOfPeople;
    people--;
    setAmountOfPeople(people);
    if (people <= 1) {
      setAmountOfPeople(1);
    }
    talkToParent(people);

    // console.log('amountOfPeople', amountOfPeople);
  };
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
          // top: 100,
          left: 0,
          right: 0,
          height: height,
        },
      ]}>
      <BackButton />
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
      {/* <View style={styles.titleBar}> */}

      {/* <NumericInput
                minValue={1}
                type="up-down"
                onChange={value => console.log(value)}
              /> */}
      {/* </View> */}
      {/* <Image
        style={[styles.blob]}
        source={require('../assets/images/wave.png')}
      /> */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#9ea9b5',
          position: 'absolute',
          bottom: -80,
          left: 5,
          right: 5,
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // width: 50,
            // borderColor: colors.secondarycolor,
            // borderWidth: 3,
          }}>
          <Button
            title="-"
            onPress={handleDecrease}
            color={colors.secondarycolor}
          />
          <Text
            style={{
              color: colors.secondarycolor,
              fontSize: 20,
              width: 30,
              textAlign: 'center',
            }}>
            {amountOfPeople}
          </Text>
          <FontIcon
            // style={styles.arrow}
            name="user-alt"
            size={20}
            style={{padding: 5}}
            color={colors.secondarycolor}
          />
          <Button
            title="+"
            onPress={handleIncrease}
            color={colors.secondarycolor}
          />
        </View>
        <Text style={styles.barText}>
          {/* {recipeData.amountOfPeople} */}

          {/* Recipe ❤️ {route.params.id} */}
          <Rating
            rating={[
              recipeData.rating.rating,
              recipeData.rating.amountOfRatings,
            ]}
          />
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
          }}>
          {recipeData.seasons.fall && (
            <SeasonButton
              imgUrl={require(fallImg)}
              colorBackground={'#ffa289'}
              interactable={false}
              enabled={recipeData.seasons.fall}
              id={fallImg}
            />
          )}
          {recipeData.seasons.winter && (
            <SeasonButton
              imgUrl={require(winterImg)}
              colorBackground={'#6595cb'}
              interactable={false}
              enabled={recipeData.seasons.winter}
              id={winterImg}
            />
          )}
          {recipeData.seasons.spring && (
            <SeasonButton
              imgUrl={require(springImg)}
              colorBackground={'#ffb9d6'}
              interactable={false}
              enabled={recipeData.seasons.spring}
              id={springImg}
            />
          )}
          {recipeData.seasons.summer && (
            <SeasonButton
              style={{margin: -5}}
              imgUrl={require(summerImg)}
              colorBackground={'#f5de7e'}
              interactable={false}
              enabled={recipeData.seasons.summer}
              id={summerImg}
            />
          )}
        </View>
      </View>
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
    color: '#fff',
  },
  timeText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 4,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    padding: 20,
  },

  likeContainer: {
    position: 'absolute',
    top: 18,
    right: 0,
    margin: 10,
  },
  titleBar: {
    width: Dimensions.get('window').width * 0.95,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // margin: 25,
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
    bottom: -65,
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
    // backgroundColor: colors.maincolor,
    borderBottomWidth: 3,
    borderBottomColor: colors.maincolor,
  },
});
export default ImageHeader;
