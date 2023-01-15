import {default as React, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CountDownTimer from 'react-native-countdown-timer-hooks';
import Sound from 'react-native-sound';
import ping from '../assets/sounds/ping.wav';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';

const Timers = ({timer, name}) => {
  // state to hold all the timers
  const [timers, setTimers] = useState(handleCheckForTimers());

  // state to hold the intervalIds of all the timers
  const [intervalIds, setIntervalIds] = useState({});

  // state to trigger re-rendering of the component
  const [reload, setReload] = useState(false);

  // function to handle the case when the timer is undefined and setting the data
  function handleCheckForTimers() {
    if (timer !== undefined) {
      let timerArray = [];
      timer.map((item, index) => {
        let timer = addTimer(item, index);
        timerArray.push(timer);
      });
      return timerArray;
    }
  }

  // sound file to play when the timer finishes
  var pings = new Sound(ping, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  Sound.setCategory('Playback');
  const finishTimer = (title, id) => {
    // Find the timer that needs to be replaced
    const timerToReplace = timers.find(timer => timer.id === id);

    // Create a new timer with the same time as the old one
    let timerArray = [...timers];
    timerArray.push(addTimer(timerToReplace.time, timers.length));

    //Remove the old timer
    setTimers(timerArray.filter(timer => timer.id !== id));
    alert(title + ' finished');
    pings.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    setReload(!reload);
  };

  function addTimer(time, index) {
    return {
      id: Date.now() + index, // unique ID for the timer
      time: Number.parseInt(time), // time in milliseconds
      running: false, // whether the timer is currently running
      title: 'Timer ' + (index + 1), // title of the timer
      recipeName: name,
      timeLeft: Number.parseInt(time), // time left in milliseconds
    };
  }

  const handleStart = id => {
    const selectedTimer = timers.find(timer => timer.id === id);
    if (!selectedTimer) return;
    selectedTimer.running = true;
    const intervalId = setInterval(() => {
      if (selectedTimer.timeLeft <= 0) {
        clearInterval(intervalId);
        finishTimer(selectedTimer.title, id);
      }
      selectedTimer.timeLeft -= 1;
      console.log('timer.timeLeft', selectedTimer.timeLeft);
    }, 1000);
    setIntervalIds({...intervalIds, [id]: intervalId});
    setReload(!reload);
  };

  const handlePause = id => {
    const selectedTimer = timers.find(timer => timer.id === id);
    if (!selectedTimer) return;
    if (!selectedTimer.running) {
      handleStartStop(id);
    } else {
      console.log('timer pausing');
      clearInterval(intervalIds[id]);
      setIntervalIds({...intervalIds, [id]: null});
      selectedTimer.running = false;
    }
    setReload(!reload);
  };
  return (
    <FlatList
      data={timers}
      horizontal
      extraData={reload}
      style={styles.timerRow}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      renderItem={({item, index}) => (
        <View key={item.id}>
          <Text style={styles.timerTitle}>{item.title}</Text>
          {item.running ? (
            <TouchableOpacity onPress={() => handlePause(item.id)}>
              <CountDownTimer
                timestamp={item.timeLeft}
                timerCallback={() => finishTimer(item.title, index)}
                containerStyle={styles.timer}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.timer}
              onPress={() => handleStart(item.id)}>
              <Text style={globalStyles.buttonText}>
                Start: {item.timeLeft}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  timer: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default Timers;
