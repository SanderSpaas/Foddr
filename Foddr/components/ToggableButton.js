import React from 'react';
import {
  Dimensions, StyleSheet,
  Text, TouchableOpacity
} from 'react-native';
import colors from '../theme/colors';

const ToggableButton = ({text, color,id, talkToParent, enabled}) => {
  function handleClick() {
    talkToParent(id);
  }
  return (
    <TouchableOpacity
      style={
        enabled
          ?[styles.card, {backgroundColor: color, borderColor: color}]
          :  [styles.card, {borderColor: color,backgroundColor: '#fff'}]
      }
      onPress={() => {
        handleClick();
      }}>
      <>
        <Text
          style={enabled ? [styles.text, styles.textSelected]: styles.text }>
          {text}
        </Text>
      </>
    </TouchableOpacity>
  );
};

ToggableButton.defaultProps = {
  color: '#008bea',
  text: 'i am text',
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.45,
    height: 75,
    // borderWidth: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: colors.textcolor,
    fontSize: 18,
  },
  textSelected: {
    color: colors.backgroundcolor,
  },
});
export default ToggableButton;
