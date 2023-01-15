import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageHeader from '../components/ImageHeader.js';
import Loader from '../components/Loader.js';
import RatingBar from '../components/RatingBar.js';
import Timers from '../components/Timers';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrollYSticky, setScrollYSticky] = useState(new Animated.Value(0));
  const [amountOfPeople, setAmountOfPeople] = useState(1);
  const [rating, setRating] = useState(null);
  const [timers, setTimers] = useState([]);
  const stickyHeaderHeight = 100;
  const screenHeight = Dimensions.get('window').height;

  const {recipeId} = route.params;
  // console.log('route information', route);
  // console.log('navigation check', navigation);
  // console.log('recipeId from params', recipeId);

  const talkToParent = amount => {
    //make sure the amount isnt smaller then 1
    setAmountOfPeople(Math.max(amount, 1));
    console.log('amountOfPeople', amount);
    console.log('amountOfPeople', amountOfPeople);
  };

  function parentRatingCallback(rating) {
    setRating(rating);
  }
  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);
        setScrollY(new Animated.Value(0));
        const recipeDataStorage = await db
          .collection('recipes')
          .doc(recipeId)
          .get();
        setRecipeData(recipeDataStorage.data());
        setAmountOfPeople(recipeDataStorage.data().amountOfPeople);

        setLoading(false);
      } catch (error) {
        console.log('er gaat iets fout ' + error);
      }
    };

    getRecipe();
  }, [recipeId]);

  const toValue =
    scrollY > stickyHeaderHeight ? scrollY - stickyHeaderHeight : 0;
  Animated.spring(scrollYSticky, {
    toValue: toValue,
    useNativeDriver: false,
  }).start();

  return (
    <View style={{height: screenHeight, backgroundColor: 'white'}}>
      {!loading ? (
        <>
          <ImageHeader
            recipeData={recipeData}
            route={route}
            scrollY={scrollY}
            scrollYSticky={scrollYSticky}
            talkToParent={talkToParent}
            ratingUpdated={rating}
          />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            scrollEventThrottle={20}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
              },
            )}>
            <View style={styles.recipe}>
              {recipeData.description && (
                <>
                  <Text style={styles.title}>Description</Text>

                  <Image
                    style={[
                      {
                        height: 70,
                        width: Dimensions.get('window').width,
                      },
                    ]}
                    source={require('../assets/images/topWave.png')}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#fff',
                        backgroundColor: colors.maincolor,
                        width: '100%',
                        paddingTop: 10,
                        paddingBottom: 10,
                      },
                    ]}>
                    {recipeData.description}
                  </Text>
                  <Image
                    style={[
                      {
                        height: 70,
                        width: Dimensions.get('window').width,
                      },
                    ]}
                    source={require('../assets/images/bottemWave.png')}
                  />
                </>
              )}

              {recipeData.timers.length > 0 && (
                <>
                  <Text style={styles.title}>Timers</Text>
                  <Timers timer={recipeData.timers} name={recipeData.name} />
                </>
              )}

              <Text style={styles.title}>Ingredients</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {recipeData.ingredients.map((item, index) => (
                  <Text style={styles.listItem} key={index}>
                    🍴{item.name} -{' '}
                    {Math.round(
                      (item.amount / recipeData.amountOfPeople) *
                        amountOfPeople,
                    )}{' '}
                    {item.unitOfMeasure}
                  </Text>
                ))}
              </View>

              <Text style={styles.title}>Instructions</Text>
              {recipeData.instructions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                  key={index + 1}>
                  <Text style={globalStyles.instructionItemKey}>
                    {index + 1}
                  </Text>
                  <Text style={styles.instructionItem}>{item}</Text>
                </View>
              ))}
              <RatingBar
                rating={recipeData.rating}
                recipeID={recipeId}
                style={{}}
                parentRatingCallback={parentRatingCallback}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <Loader loading={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
    alignItems: 'baseline',
  },
  root: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.backgroundcolor,
    backgroundColor: 'white',
  },

  ingredient: {
    fontSize: 20,
    // zIndex: 20,
    padding: 20,
    backgroundColor: colors.backgroundcolor,
    flexDirection: 'row',
  },
  text: {
    color: colors.textcolor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontSize: 18,
  },
  recipe: {
    marginTop: 360,
    marginBottom: 60,
    zIndex: 19,
    color: colors.textcolor,
  },
  listItem: {
    color: colors.textcolor,
    padding: 10,
    fontSize: 20,
    width: Dimensions.get('window').width * 1,
    padding: 10,
  },

  instructionItem: {
    color: colors.textcolor,
    padding: 10,
    fontSize: 20,
    width: Dimensions.get('window').width * 0.9,
  },
  title: {
    color: colors.maincolor,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});
export default Recipe;
