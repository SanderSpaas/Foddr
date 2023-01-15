import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import AddItem from './AddItem';
const Instruction = props => {
  const [text, setText] = useState('');

  const [reload, setReload] = useState(false);
  const [instructions, setInstructions] = useState(['']);
  useEffect(() => {
    setInstructions(props.instructions);
  }, []);
  function parentCallback() {
    let instructionArray = instructions;
    console.log(instructions);
    instructionArray.push('');
    setInstructions(instructionArray);
    setReload(!reload);
    console.log('instructies here jong: ' + JSON.stringify(instructions));
  }
  const editCallback = (index, value) => {
    console.log('instructions changing item at index: ' + index);
    let instructionArray = instructions;
    instructionArray[index] = value;
    setInstructions(instructionArray);
    console.log('instructies edit: ' + JSON.stringify(instructions));
    props.recipeCallBack(instructionArray);
  };
  deleteCallback = index => {
    console.log('removing item at index: ' + index);
    let instructionArray = instructions;
    instructionArray.splice(index, 1);
    setReload(!reload);
    setInstructions(instructionArray);
    console.log('instructies delete: ' + JSON.stringify(instructions));
  };
  return (
    <View style={styles.card}>
      <FlatList
        data={instructions}
        keyExtractor={(item, index) => index}
        extraData={reload}
        style={[globalStyles.colordBorder, styles.instructions]}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={globalStyles.instructionItemKey}>{index + 1}</Text>
            <TextInput
              style={[globalStyles.textInput, styles.text]}
              // placeholder="Fill in the instruction."
              placeholderTextColor={colors.textcolor}
              keyboardType="default"
              multiline={true}
              defaultValue={instructions[index]}
              onChangeText={value => editCallback(index, value)}
            />
            <TouchableOpacity
              style={[globalStyles.textInput, globalStyles.deleteButton]}
              onPress={() => deleteCallback(index)}>
              <FontIcon name="trash" size={25} solid color={colors.textcolor} />
            </TouchableOpacity>
          </View>
        )}
      />
      <AddItem parentCallback={parentCallback} title={'instruction'} />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginBottom: 6,
    color: colors.textcolor,
  },
  text: {
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
  instructions: {
    width: Dimensions.get('window').width * 0.9,
  },
});

export default Instruction;
