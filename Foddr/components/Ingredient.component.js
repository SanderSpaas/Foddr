import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
const Ingredient = props => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  useEffect(() => {
    setName(props.name);
    setAmount(props.amount);
    setUnitOfMeasure(props.unitOfMeasure);
  }, []);
  const updateName = value => {
    setName(value);
    props.editCallbackIng(props.index, {
      name: name,
      amount: amount,
      unitOfMeasure: unitOfMeasure,
    });
  };
  const updateAmount = value => {
    setAmount(value);
    props.editCallbackIng(props.index, {
      name: name,
      amount: amount,
      unitOfMeasure: unitOfMeasure,
    });
  };
  const updateUnitOfMeasure = value => {
    setUnitOfMeasure(value);
    props.editCallbackIng(props.index, {
      name: name,
      amount: amount,
      unitOfMeasure: unitOfMeasure,
    });
  };
  return (
    <SafeAreaView style={styles.card}>
      {/* <Text style={styles.number}>{props.index + 1}</Text> */}
      <TextInput
        style={[styles.name, globalStyles.textInput]}
        // placeholder="Fill in the ingredient."
        placeholderTextColor={colors.textcolor}
        keyboardType="default"
        value={name}
        onChangeText={value => updateName(value)}
      />
      <TextInput
        style={[ styles.amount,globalStyles.textInput]}
        // placeholder="Fill in the amount."
        placeholderTextColor={colors.textcolor}
        keyboardType="numeric"
        maxLength={4}
        value={amount}
        onChangeText={value => updateAmount(value.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        style={[styles.unitOfMeasure,globalStyles.textInput]}
        // placeholder="Fill in the unit of measure."
        placeholderTextColor={colors.textcolor}
        keyboardType="default"
        value={unitOfMeasure}
        onChangeText={value => updateUnitOfMeasure(value)}
      />
      <TouchableOpacity
        style={[globalStyles.textInput, globalStyles.deleteButton]}
        onPress={() => props.deleteCallbackIng(props.index)}>
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
    // alignItems: 'baseline',
    backgroundColor: '#fff',
    padding: 5,
  },
  text: {
    color: colors.textcolor,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 5,
    // marginRight: 10,
  },
  name: {
    flex: 6,
    // backgroundColor: colors.pink,
  },
  amount: {flex: 2},
  unitOfMeasure: {
    flex: 5,
  },
});

export default Ingredient;
