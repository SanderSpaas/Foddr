import React, { useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
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
  ratingUpdated,
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
      <View style={styles.backContainer}>
        <BackButton />
      </View>

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
      <LinearGradient
        locations={[0, 1.0]}
        colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']}
        style={styles.linearGradient}></LinearGradient>
      <View
        style={{
          // borderBottomWidth: 1,
          // borderBottomColor: '#9ea9b5',
          position: 'absolute',
          bottom: -80,
          width: '100%',
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
          <Rating
            rating={
              ratingUpdated !== null ? () => ratingUpdated : recipeData.rating
            }
          />
        </Text>
        {/* <Text style={styles.barText}>
          {JSON.stringify(ratingUpdated)}
          {JSON.stringify(recipeData.rating)}
        
        </Text> */}
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
    zIndex: 2,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    width: Dimensions.get('window').width * 0.8,
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
  backContainer: {
    position: 'absolute',
    top: 18,
    left: 0,
    margin: 10,
  },
});
export default ImageHeader;
