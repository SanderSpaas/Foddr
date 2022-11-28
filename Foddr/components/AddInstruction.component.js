import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';

const AddInStruction = props => {
  const [text, setText] = useState('');
  return (
    <View style={[styles.colordBorder, styles.addView]}>
      <TextInput
        style={[styles.addTitle]}
        placeholder="Fill in the instruction."
        placeholderTextColor={colors.textcolor}
        keyboardType="default"
        onChangeText={value => setText(value)}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (text.trim().length > 0) {
            props.parentCallback(text);
          }
        }}>
        <FontIcon
          name="plus"
          size={20}
          // style={[styles.addButton]}
          solid
          color={colors.textcolor}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  },
  colordBorder: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.maincolor,
    // borderTopColor: colors.firstColor,
    // borderRightColor: colors.secondColor,
    // borderBottomColor: colors.thirthColor,
    // borderLeftColor: colors.fourthColor,
  },
  addTitle: {
    color: colors.textcolor,
  },
  addButton: {
    backgroundColor: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 15,
    // backgroundColor: colors.pink,
    // borderLeftColor: '#ed4d1d',
    borderLeftColor: colors.maincolor,
    borderLeftWidth: 2,
  },
});

export default AddInStruction;
