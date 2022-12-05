import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
const Instruction = props => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(props.instruction);
  }, []);
  const updateText = value => {
    props.editCallback(props.index, value);
    setText(value);
  };
  return (
    <SafeAreaView style={styles.card}>
      <Text style={styles.number}>{props.index + 1}</Text>

      <TextInput
        style={[styles.text]}
        placeholder="Fill in the instruction."
        placeholderTextColor={colors.textcolor}
        keyboardType="default"
        value={text}
        multiline={true}
        onChangeText={value => updateText(value)}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => props.deleteCallback(props.index)}>
        <FontIcon name="trash" size={25} solid color={colors.textcolor} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    color: colors.textcolor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 10,
  },
  text: {
    color: colors.textcolor,
    width: Dimensions.get('window').width * 0.5,
  },
  number: {
    color: colors.textcolor,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  deleteButton: {
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Instruction;
