import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import AddItem from './AddItem';
const Ingredient = props => {
  const [reload, setReload] = useState(false);
  const [ingredients, setIngredients] = useState(props.ingredients);

  useEffect(() => {
    setIngredients(props.ingredients);
  }, []);

  function handleCallbackIng() {
    let ingredientsArray = ingredients;
    ingredientsArray.push({name: '', amount: '', unitOfMeasure: ''});
    setIngredients(ingredientsArray);
    setReload(!reload);
    console.log('ingredienten: ' + JSON.stringify(ingredients));
  }
  const editCallbackIng = (index, value) => {
    let ingredientsArray = ingredients;
    ingredientsArray[index] = value;
    setIngredients(ingredientsArray);
    console.log(ingredients);
    props.recipeCallBackIng(ingredientsArray);
  };
  deleteCallbackIng = index => {
    console.log('removing item at index: ' + index);
    let ingredientsArray = ingredients;
    ingredientsArray.splice(index, 1);
    setReload(!reload);
    setIngredients(ingredientsArray);
    console.log(ingredients);
  };
  return (
    <SafeAreaView style={styles.card}>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index}
        extraData={reload}
        style={[globalStyles.colordBorder, styles.ingredients]}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Text style={styles.number}>{props.index + 1}</Text> */}
            <TextInput
              style={[styles.name, globalStyles.textInput]}
              // placeholder="Fill in the ingredient."
              placeholderTextColor={colors.textcolor}
              keyboardType="default"
              defaultValue={ingredients[index].name}
              onChangeText={value =>
                editCallbackIng(index, {
                  name: value,
                  amount: ingredients[index].amount,
                  unitOfMeasure: ingredients[index].unitOfMeasure,
                })
              }
            />
            <TextInput
              style={[styles.amount, globalStyles.textInput]}
              // placeholder="Fill in the amount."
              placeholderTextColor={colors.textcolor}
              keyboardType="numeric"
              maxLength={4}
              defaultValue={ingredients[index].amount}
              onChangeText={value =>
                editCallbackIng(index, {
                  name: ingredients[index].name,
                  amount: value.replace(/[^0-9]/g, ''),
                  unitOfMeasure: ingredients[index].unitOfMeasure,
                })
              }
            />
            <TextInput
              style={[styles.unitOfMeasure, globalStyles.textInput]}
              // placeholder="Fill in the unit of measure."
              placeholderTextColor={colors.textcolor}
              keyboardType="default"
              defaultValue={ingredients[index].unitOfMeasure}
              onChangeText={value =>
                editCallbackIng(index, {
                  name: ingredients[index].name,
                  amount: ingredients[index].amount,
                  unitOfMeasure: value,
                })
              }
            />
            <TouchableOpacity
              style={[globalStyles.textInput, globalStyles.deleteButton]}
              onPress={() => deleteCallbackIng(index)}>
              <FontIcon name="trash" size={25} solid color={colors.textcolor} />
            </TouchableOpacity>
          </View>
        )}
      />
      <AddItem parentCallback={handleCallbackIng} title={'ingredient'} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginBottom: 6,
    color: colors.textcolor,
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
  ingredients: {
    width: Dimensions.get('window').width * 0.9,
    padding: 5,
  },
});

export default Ingredient;
