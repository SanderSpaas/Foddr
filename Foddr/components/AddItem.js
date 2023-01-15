import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../theme/globalStyles';
const AddItem = props => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={[globalStyles.buttonMedium]}
        onPress={() => {
          props.parentCallback();
        }}>
        <Text style={[styles.addTitle, globalStyles.buttonText]}>
          Add another {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;
