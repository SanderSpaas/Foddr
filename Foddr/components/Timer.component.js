import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import AddItem from './AddItem';
const Timer = props => {
  const [text, setText] = useState('');

  const [reload, setReload] = useState(false);
  const [timers, setTimers] = useState([0]);

  useEffect(() => {
    setTimers(props.timers);
  }, []);

  function parentCallback() {
    let timersArray = timers;
    console.log(timers);
    timersArray.push(0);
    setTimers(timersArray);
    setReload(!reload);
    console.log('timers here jong: ' + JSON.stringify(timers));
  }
  const editCallback = (index, value) => {
    console.log('timers changing item at index: ' + index);
    let timersArray = timers;
    timersArray[index] = value.replace(/[^0-9]/g, '');
    setTimers(timersArray);
    console.log('instructies edit: ' + JSON.stringify(timers));
    props.recipeCallBack(timersArray);
  };
  deleteCallback = index => {
    console.log('removing item at index: ' + index);
    let timersArray = timers;
    timersArray.splice(index, 1);
    setReload(!reload);
    setTimers(timersArray);
    console.log('instructies delete: ' + JSON.stringify(timers));
  };
  return (
    <View style={styles.card}>
      <FlatList
        data={timers}
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
              keyboardType="numeric"
              defaultValue={timers[index]}
              maxLength={3}
              multiline={true}
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
      <AddItem parentCallback={parentCallback} title={'timer'} />
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

export default Timer;
