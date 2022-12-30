import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
const AddItem = props => {
  // const [text, setText] = useState('');
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
