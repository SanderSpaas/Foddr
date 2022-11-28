import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Button from 'components/Button';
import {colors} from 'theme';
// import {createAlarm} from 'react-native-simple-alarm';
import moment from 'moment';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

// createAlarm = async () => {
//   try {
//     await createAlarm({
//       active: false,
//       date: new Date().toISOString(),
//       message: 'message',
//       snooze: 1,
//     });
//   } catch (e) {}
// };

const Details = ({route, navigation}) => {
  const from = route?.params?.from;
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Button
        title="Go Back"
        color="white"
        backgroundColor={colors.pink}
        // onPress={createAlarm}
      />
    </View>
  );
};

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({from: PropTypes.string}),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

Details.defaultProps = {
  route: {params: {from: ''}},
  navigation: {goBack: () => null},
};

export default Details;
