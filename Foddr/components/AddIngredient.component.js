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

const AddIngredient = props => {
  const [text, setText] = useState('');
  return (
    <View>
      <TouchableOpacity
        style={[styles.colordBorder, styles.addView, styles.addButton]}
        onPress={() => {
          props.parentCallback(text);
        }}>
        <Text style={[styles.addTitle]}>
          Click me to add another ingredient
        </Text>

        <FontIcon
          name="plus"
          size={20}
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
    width: Dimensions.get('window').width * 0.8,
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
    borderLeftColor: colors.maincolor,
    borderLeftWidth: 2,
  },
});

export default AddIngredient;
