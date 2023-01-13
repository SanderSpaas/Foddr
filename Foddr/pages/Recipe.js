import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {
  useFocusEffect,
  StackActions,
  useNavigation,
  NavigationActions,
} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {set} from 'react-native-reanimated';
import Sound from 'react-native-sound';
import ping from '../assets/sounds/ping.wav';
import ImageHeader from '../components/ImageHeader.js';
import Loader from '../components/Loader.js';
import RatingBar from '../components/RatingBar.js';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';

const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [running, setRunning] = useState(false);
  const [scrollYSticky, setScrollYSticky] = useState(new Animated.Value(0));
  const stickyHeaderHeight = 100;
  const [timers, setTimers] = useState([]);
  // const [recipeId, setRecipeId] = useState();
  const [reload, setReload] = useState(false);
  const [amountOfPeople, setAmountOfPeople] = useState(1);
  const [rating, setRating] = useState(null);
  const screenHeight = Dimensions.get('window').height;
  Sound.setCategory('Playback');
  // const navigation = useNavigation();
  // const { recipeID } = navigation.state.params || {};
  const {recipeId} = route.params;
  // console.log('route information', route);
  // console.log('navigation check', navigation);
  // console.log('recipeId from params', recipeId);
  var pings = new Sound(ping, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const talkToParent = amount => {
    //make sure the amount isnt smaller then 1
    if (amount <= 1) {
      amount = 1;
    }
    setAmountOfPeople(amount);
    console.log('amountOfPeople', amount);
    console.log('amountOfPeople', amountOfPeople);
  };
  finishTimer = (title, id) => {
    alert(title + ' finished');
    let timerArray = timers;
    timerArray[id].finished = true;
    setTimers(timerArray);
    pings.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  const addTimer = time => {
    const newTimer = {
      id: Date.now(), // unique ID for the timer
      time: Number.parseInt(time), // time in milliseconds
      running: false, // whether the timer is currently running
      title: 'Timer ' + (timers.length + 1), // title of the timer
      finished: false,
    };
    let timerArray = timers;
    timerArray.push(newTimer);
    setTimers(timerArray);
    // console.log('timers in func met ' + time, timerArray);
  };
  const updateTimer = id => {
    // find the timer with the matching ID and update if its running
    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        // if (timer.finished) {
        //   setLoading(true);
        //   console.log('timer finished; restarting');
        //   addTimer(timer.time);
        //   setLoading(false);
        //   setReload(!reload);
        // } else {
        return {
          ...timer,
          running: !timer.running,
        };
        // }
      }
      return timer;
    });
    setTimers(updatedTimers);
  };
  function parentRatingCallback(rating) {
    setRating(rating);
  }
  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);
        setScrollY(new Animated.Value(0));
        // console.log('recipeID', recipeId);
        //fetch the recipe from the database with the id
        const recipeDataStorage = await db
          .collection('recipes')
          .doc(recipeId)
          .get();
        // console.log('recipeDataStorage', recipeDataStorage.data());

        setRecipeData(recipeDataStorage.data());
        setAmountOfPeople(recipeDataStorage.data().amountOfPeople);
        if (recipeDataStorage.timers !== undefined) {
          recipeDataStorage.timers.map(timer => {
            addTimer(timer);
            // console.log('timer', timer);
          });
        }
        // }
        setLoading(false);
      } catch (error) {
        // Error retrieving data
        console.log('er gaat iets fout ' + error);
      }
    };
    getRecipe();
  }, [recipeId]);

  if (scrollY > stickyHeaderHeight) {
    Animated.spring(scrollYSticky, {
      toValue: scrollY - stickyHeaderHeight,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(scrollYSticky, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }
 
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
              <>
                {/* {!loading && (
                <>
                  <Text style={styles.title}>Timers</Text> */}
                {/* <FlatList
                    data={timers}
                    horizontal
                    extraData={reload}
                    style={styles.timerRow}
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    renderItem={({item, index}) => (
                      <View
                        key={item.id}
                        style={[
                          item.finished ? {display: 'none'} : {},
                        ]}>
                        <Text style={styles.text}>Timer Index:{index}</Text>
                        <Text style={styles.text}>Timer ID: {item.id}</Text>
                        <Text style={styles.text}>
                          Running: {item.running ? 'Yes' : 'No'}
                        </Text>
                        <CountDown
                          style={styles.timer}
                          size={20}
                          until={item.time}
                          onFinish={() => finishTimer(item.title, index)}
                          digitStyle={{
                            color: '#fff',
                            marginLeft: -3,
                            marginRight: -3,
                            width: 40,
                          }}
                          digitTxtStyle={{color: '#fff'}}
                          timeLabelStyle={{
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: -2,
                            width: 2,
                          }}
                          separatorStyle={{
                            color: '#fff',
                            padding: 0,
                            letterSpacing: -2,
                            margin: 0,
                          }}
                          timeToShow={['M', 'S']}
                          timeLabels={{m: null, s: null}}
                          onPress={() => updateTimer(item.id)}
                          running={item.running}
                          showSeparator
                        />
                        <Text style={styles.timerTitle}>{item.title}</Text>
                      </View>
                    )}
                  /> */}
                {/* <ScrollView
                    style={styles.timerRow}
                    horizontal={true}
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {timers.map((timer, index) => (
                      <View key={timer.id}>
                        <CountDown
                          style={styles.timer}
                          size={20}
                          until={timer.time}
                          onFinish={() => finishTimer(timer.title, index)}
                          digitStyle={{
                            color: '#fff',
                            marginLeft: -3,
                            marginRight: -3,
                            width: 40,
                          }}
                          digitTxtStyle={{color: '#fff'}}
                          timeLabelStyle={{
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: -2,

                            width: 2,
                          }}
                          separatorStyle={{
                            color: '#fff',
                            padding: 0,
                            letterSpacing: -2,
                            margin: 0,
                          }}
                          timeToShow={['M', 'S']}
                          timeLabels={{m: null, s: null}}
                          onPress={() => updateTimer(timer.id)}
                          running={timer.running}
                          showSeparator
                        />
                        <Text style={styles.timerTitle}>{timer.title}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </>
              )} */}
                {/* <TouchableHighlight
                onPress={() => Linking.openURL('setalarm:')}
                style={styles.timer}>
                <Text>I AM HERE FOR TESTING</Text>
              </TouchableHighlight> */}
              </>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Text style={styles.title}>Ingredients</Text>
                {recipeData.ingredients.map((item, index) => (
                  <Text style={styles.listItem} key={index}>
                    🍴{item.name} -{' '}
                    {(item.amount / recipeData.amountOfPeople) * amountOfPeople}{' '}
                    {item.unitOfMeasure}
                  </Text>
                ))}
              </View>

              {/* <View style={{padding: 10}}> */}
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
  timer: {
    // position: 'absolute',
    // right: 0,
    // borderColor: colors.secondarycolor,
    // borderWidth: 3,
    // marginBottom: 10,
    width: 100,
    height: 100,
    // padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    backgroundColor: colors.secondarycolor,
    borderRadius: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  timerTitle: {
    color: colors.textcolor,
    textAlign: 'center',
  },
  timerRow: {
    // position: 'absolute',

    // top: 0,
    alignSelf: 'center',
    zIndex: 2,
    right: 0,
    width: Dimensions.get('window').width * 0.9,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
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
    // textAlign: 'center',
  },
  recipe: {
    // flex: 1,
    // position: 'absolute',

    marginTop: 360,
    marginBottom: 60,
    zIndex: 19,
    color: colors.textcolor,
    // backgroundColor: colors.pink,
    // height: 500,
    // width: 250,
  },
  listItem: {
    color: colors.textcolor,
    padding: 10,
    fontSize: 20,
    width: Dimensions.get('window').width * 1,
    padding: 10,
    // backgroundColor: 'green',
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
  },
});
export default Recipe;
