import React, { useEffect, useState } from 'react';
import {
  Dimensions, SafeAreaView, StyleSheet,
  Text, TextInput, TouchableOpacity
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
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
      <Text style={globalStyles.instructionItemKey}>{props.index + 1}</Text>

      <TextInput
        style={[globalStyles.textInput,styles.text]}
        placeholder="Fill in the instruction."
        placeholderTextColor={colors.textcolor}
        keyboardType="default"
        value={text}
        multiline={true}
        onChangeText={value => updateText(value)}
      />
      <TouchableOpacity
        style={[globalStyles.textInput,globalStyles.deleteButton]}
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
  },
  text: {
    // color: colors.textcolor,
    width: Dimensions.get('window').width * 0.6,
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
