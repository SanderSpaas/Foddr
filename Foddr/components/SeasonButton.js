import React from 'react';
import {
  Image, TouchableOpacity
} from 'react-native';

const SeasonButton = ({
  imgUrl,
  enabled,
  color,
  colorBackground,
  talkToParent,
  id,
  interactable,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (interactable) {
          talkToParent(id, !enabled);
        }
      }}
      style={
        enabled
          ? [
              styles.buttonLocation,
              {backgroundColor: colorBackground, borderColor: color},
            ]
          : [
              styles.buttonLocation,
              {backgroundColor: '#fff', borderColor: color},
            ]
      }>
      <Image source={imgUrl} style={styles.userLocation} />
    </TouchableOpacity>
  );
};
SeasonButton.defaultProps = {
  interactable: true,
}
const styles = {
  buttonLocation: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    // borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#000',
  },
  userLocation: {
    width: 30,
    height: 30,
  },
};
export default SeasonButton;
