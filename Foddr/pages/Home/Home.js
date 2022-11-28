import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Button from '../../components/Button/Button.js';
// import {colors} from '../../theme/colors';
// import {createAlarm, getAlarms} from 'react-native-simple-alarm';
// import moment from 'moment';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.lightGrayPurple,
    backgroundColor: '#f7f7fb',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
// async function alarm() {
//   try {
//     await createAlarm({
//       active: true,
//       date: new Date(new Date().getTime() + 1 * 60000),
//       message: 'your timer has finished',
//       // snooze: 1,
//     });
//   } catch (e) {}
//   const alarms = await getAlarms();
//   console.log(alarms);
// }
const Home = ({navigation}) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Home</Text>
    <Button
      title="Go to Details"
      color="white"
      backgroundColor={'#9388db'}
      onPress={() => {
        // alarm();
      }}
    />
  </View>
);

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Home.defaultProps = {
  navigation: {navigate: () => null},
};

export default Home;
