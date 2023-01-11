import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import ImageHeader from '../components/ImageHeader.js';
import Loader from '../components/Loader.js';
import Sound from 'react-native-sound';
import ping from '../assets/sounds/ping.wav';
import {FlatList} from 'react-native-gesture-handler';

const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [running, setRunning] = useState(false);
  const [scrollYSticky, setScrollYSticky] = useState(new Animated.Value(0));
  const stickyHeaderHeight = 100;
  const [timers, setTimers] = useState([]);

  const [reload, setReload] = useState(false);
  const [amountOfPeople, setAmountOfPeople] = useState(1);
  let recipeID;
  Sound.setCategory('Playback');
  var pings = new Sound(ping, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  const talkToParent = amount => {
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
    console.log('timers in func met ' + time, timerArray);
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

  async function getRecipe() {
    setLoading(true);
    try {
      let recipeDataStorage = await AsyncStorage.getItem('recipe');
      recipeDataStorage = JSON.parse(recipeDataStorage);
      recipeID = await AsyncStorage.getItem('id');
      if (recipeDataStorage !== null) {
        // We have data!!
        console.log('recipeID', recipeID);
        setRecipeData(recipeDataStorage);
        setAmountOfPeople(recipeDataStorage.amountOfPeople);
        // console.log('recipeData', recipeDataStorage);
        // console.log('recipeData', recipeDataStorage.timers);
        if (recipeDataStorage.timers !== undefined) {
          recipeDataStorage.timers.map(timer => {
            addTimer(timer);
            console.log('timer', timer);
          });
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log('er gaat iets fout ' + error);
    }
    setLoading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      getRecipe();
    }, []),
  );

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
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{height: screenHeight, backgroundColor: 'white'}}>
      <Loader loading={loading} />
      {recipeData !== null && recipeData !== undefined ? (
        <>
          <ImageHeader
            recipeData={recipeData}
            route={route}
            scrollY={scrollY}
            scrollYSticky={scrollYSticky}
            talkToParent={talkToParent}
          />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
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
                  <Text style={styles.text}>{recipeData.description}</Text>
                </>
              )}

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

              <TouchableHighlight
                onPress={() => Linking.openURL('setalarm:')}
                style={styles.timer}>
                <Text>I AM HERE FOR TESTING</Text>
              </TouchableHighlight>

              {!loading && (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={styles.title}>Ingredients</Text>
                  {recipeData.ingredients.map((item, index) => (
                    <Text style={styles.listItem} key={index}>
                      🍴{item.name} -{' '}
                      {(item.amount / recipeData.amountOfPeople) *
                        amountOfPeople}
                      {/* {item.amount}/{recipeData.amountOfPeople}*{recipeData.amountOfPeople} */}
                      {item.unitOfMeasure}
                    </Text>
                  ))}
                </View>
              )}
              <View style={{padding: 10, marginBottom: 150}}>
                <Text style={styles.title}>Instructions</Text>
                {recipeData.instructions.map((item, index) => (
                  <View style={{flexDirection: 'row'}} key={index + 1}>
                    <Text style={globalStyles.instructionItemKey}>
                      {index + 1}
                    </Text>
                    <Text style={styles.instructionItem}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* </SafeAreaView> */}
          </ScrollView>
        </>
      ) : (
        // <Text>{recipeData.name}</Text>
        <Text>Pick a country</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
