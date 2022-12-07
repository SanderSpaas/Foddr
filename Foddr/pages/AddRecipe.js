// import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';

import {Keyboard} from 'react-native';
import Card from '../components/Card.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import functions from '@react-native-firebase/functions';
import colors from '../theme/colors.js';
import SVGImg from '../assets/images/gradient.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Like from '../components/Like.js';
import ToggableButton from '../components/ToggableButton.js';
import Instruction from '../components/Instruction.component.js';
import AddInStruction from '../components/AddInstruction.component.js';
import Camera from '../components/Camera.js';
import ProgressBar from 'react-native-progress/Bar';
import Ingredient from '../components/Ingredient.component.js';
import AddIngredient from '../components/AddIngredient.component.js';
const auth = firebase.auth();
const db = firebase.firestore();
let amountofPages = 6;
const AddRecipe = ({route, navigation}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  // const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState([
    'This is a instruction, click me to edit me! Or add another instruction by clicking the + button',
  ]);
  const [ingredients, setIngredients] = useState([
    {name: 'Maybe a carrot', amount: 3, unitOfMeasure: 'whole'},
  ]);
  const [formData, setFormData] = useState({
    name: '',
    fall: false,
    winter: false,
    spring: false,
    summer: false,
    time: 0,
    fileUri: '',
  });
  const [reload, setReload] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [page, setPage] = useState(0);
  // const [isLoading, setLoading] = useState(false);
  function talkToParent(data) {
    // console.log(data); // LOGS DATA FROM CHILD
    if (data[0] === '🍁 Fall 🍂') {
      setFormData({
        ...formData,
        fall: !formData.fall,
      });
    } else if (data[0] === '⛄ Winter ❄️') {
      setFormData({
        ...formData,
        winter: !formData.winter,
      });
    } else if (data[0] === '🌼 Spring 🌷') {
      setFormData({
        ...formData,
        spring: !formData.spring,
      });
    } else {
      setFormData({
        ...formData,
        summer: !formData.summer,
      });
    }
    console.log(formData);
  }

  const handleUri = fileUri => {
    // setFormData({
    //   fileUri: fileUri,
    // });
    setFormData({
      ...formData,
      fileUri: fileUri,
    });
  };
  function handleCallbackIng() {
    let ingredientsArray = ingredients;
    ingredientsArray.push({name: 'name', amount: 0, unitOfMeasure: 'gr'});
    setIngredients(ingredientsArray);
    setReload(!reload);
    console.log('ingredienten: ' + JSON.stringify(ingredients));
  }
  const editCallbackIng = (index, value) => {
    console.log('changing item at index: ' + index);
    let ingredientsArray = ingredients;
    ingredientsArray[index] = value;
    setIngredients(ingredientsArray);
  };
  deleteCallbackIng = index => {
    console.log('removing item at index: ' + index);
    let ingredientsArray = ingredients;
    ingredientsArray.splice(index, 1);
    setReload(!reload);
    setIngredients(ingredientsArray);
    console.log(ingredients);
  };
  function handleCallback() {
    // setInstruction(current => [...current, value]);
    let instructionArray = instructions;
    console.log(instructions);
    instructionArray.push('Click me to edit me');
    setInstructions(instructionArray);
    Keyboard.dismiss();
    setReload(!reload);
    console.log('instructies: ' + JSON.stringify(instructions));
  }
  const editCallback = (index, value) => {
    console.log('instructions changing item at index: ' + index);
    let instructionArray = instructions;
    instructionArray[index] = value;
    // console.log(instruction);
    // setInstruction(instructionArray);
    setInstructions(instructionArray);

    console.log('instructies edit: ' + JSON.stringify(instructions));
  };
  deleteCallback = index => {
    console.log('removing item at index: ' + index);
    let instructionArray = instructions;
    instructionArray.splice(index, 1);
    // console.log(instructionArray);
    // this.setState({ data: null }, () => { this.setState({ data: actualData }) });
    setReload(!reload);
    setInstructions(instructionArray);
    // setInstruction(instructionArray);
    console.log('instructies delete: ' + JSON.stringify(instructions));
  };
  handleSubmit = async () => {
    //gaan nakijken of we op de laatste pagina zitten anders gewoon + doen
    if (page === amountofPages) {
      console.log('yey');
    } else {
      setPage(page + 1);
    } 
    
  };

  const pageSwitcher = () => {
    // console.log(JSON.stringify(formData));
    // console.log(JSON.stringify(instructions));
    // console.log(JSON.stringify(ingredients));
    switch (page) {
      case 0:
        return (
          <>
            <Text style={styles.title}>
              Go through the steps to add a recipe.
            </Text>
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.title}>What is the recipe called?</Text>
            <View>
              <Text style={styles.label}>Fill in the recipe name</Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                // placeholder="Fill in the recipe name"
                onChangeText={value =>
                  setFormData({
                    ...formData,
                    name: value,
                  })
                }
                value={formData.name}
                style={[styles.colordBorder, styles.textInput]}
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>What are the instructions?</Text>
            <View style={[styles.colordBorder, styles.instructions]}>
              <FlatList
                data={instructions}
                // keyExtractor={item => item}
                extraData={reload}
                // keyExtractor={ (item, index) => index }
                renderItem={({item, index}) => (
                  <Instruction
                    instruction={item}
                    index={index}
                    key={index}
                    deleteCallback={deleteCallback}
                    editCallback={editCallback}
                  />
                )}
              />
            </View>
            <AddInStruction parentCallback={handleCallback} />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>
              In which seasons does this recipe belong?
            </Text>
            <View style={styles.seasonsBox}>
              <ToggableButton
                talkToParent={talkToParent}
                text={'🍁 Fall 🍂'}
                color={colors.quatrarycolor}
                enabled={formData.fall}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'⛄ Winter ❄️'}
                color={colors.maincolor}
                enabled={formData.winter}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'🌼 Spring 🌷'}
                color={colors.secondarycolor}
                enabled={formData.spring}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={' 🏵️️ Summer ⛅'}
                color={colors.triarycolor}
                enabled={formData.summer}
              />
            </View>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>How long does it take to cook?</Text>
            <View>
              <Text style={styles.label}>Time in minutes</Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                // placeholder="Minutes"
                onChangeText={value => setFormData({...formData, time: value})}
                keyboardType="numeric"
                maxLength={5}
                value={formData.time}
                style={[styles.colordBorder, styles.textInput]}
              />
            </View>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.title}>Add a picture</Text>
            <Camera handleUri={handleUri} uri={formData.fileUri} />
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.title}>What are the ingredients?</Text>
            <View style={[styles.colordBorder, styles.instructions]}>
              <View style={styles.legendaContainter}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.label}>amount</Text>
                <Text style={styles.label}>unit of measurement</Text>
              </View>

              <FlatList
                data={ingredients}
                extraData={reload}
                renderItem={({item, index}) => (
                  <Ingredient
                    name={item.name}
                    amount={item.amount}
                    unitOfMeasure={item.unitOfMeasure}
                    index={index}
                    key={index}
                    deleteCallbackIng={deleteCallbackIng}
                    editCallbackIng={editCallbackIng}
                  />
                )}
              />
            </View>
            <AddIngredient parentCallbackIng={handleCallbackIng} />
          </>
        );
      default:
        return (
          <>
            <Text>Add a recipe</Text>
          </>
        );
    }
  };
  return (
    <SafeAreaView style={styles.layout}>
      {/* <ScrollView contentContainerStyle={styles.layout}> */}
      <Image
        style={styles.blob}
        source={require('../assets/images/wave.png')}
      />
      <View style={styles.center}>{pageSwitcher()}</View>
      <View style={styles.buttonContainer}>
        {page > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPage(page - 1)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {page === 0 || page < amountofPages ? 'Next' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
      <ProgressBar
        progress={page / amountofPages}
        width={200}
        color={colors.maincolor}
        borderRadius={5}
        height={10}
      />
      <Text style={styles.progressText}>
        Step {page} out of {amountofPages}
      </Text>

      {/* <Text>We have our data</Text> */}
      {/* <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}>
        <>
          <FontIcon style={styles.arrow} name="arrow-left" size={20} solid />
          <View style={styles.arrowBackdrop}></View>
        </>
      </TouchableHighlight> */}
      {/* <View style={styles.likeContainer}>
        <Like likes={recipeData.likes} recipeId={route.params.id} />
      </View> */}

      {/* </ScrollView> */}

      {/* <TouchableHighlight onPress={postUser} style={styles.btnSection}>
              <Text style={styles.btnSend}>Add User</Text>
            </TouchableHighlight> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.6,
    // backgroundColor: colors.purple,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.7,
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.maincolor,
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.2,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  legendaContainter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressText: {
    color: colors.maincolor,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: colors.textcolor,
    textAlign: 'center',
  },
  label: {
    color: colors.textcolor,
  },
  seasonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colordBorder: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.maincolor,
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
    // marginLeft: 5,
    // borderTopColor: colors.firstColor,
    // borderRightColor: colors.secondColor,
    // borderBottomColor: colors.thirthColor,
    // borderLeftColor: colors.fourthColor,
  },
  textInput: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    paddingLeft: 15,
    color: colors.textcolor,
  },
  textInputLong: {
    height: Dimensions.get('window').height * 0.3,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  instructions: {
    width: Dimensions.get('window').width * 0.8,
    // minHeight: Dimensions.get('window').height * 0.2,
    // flexBasis: Dimensions.get('window').height * 0.2,
    // height: Dimensions.get('window').height * 0.5,
  },
  // root: {
  //   // flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   // justifyContent: 'space-between',
  //   justifyContent: 'center',
  //   backgroundColor: colors.backgroundcolor,
  // },
  ingredient: {
    fontSize: 20,
    // zIndex: 20,
    padding: 20,
    backgroundColor: colors.backgroundcolor,
    flexDirection: 'row',
  },
  text: {
    color: colors.textcolor,
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
  },
  recipe: {
    flex: 1,
    position: 'absolute',

    marginTop: 300,
    // zIndex: 20,
    color: colors.textcolor,
    // backgroundColor: colors.pink,
    height: 500,
    width: 250,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecontainer: {
    position: 'absolute',
    height: 200,
    zIndex: 2,
  },
  overlay: {
    zIndex: 3,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
  },
  titleText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 4,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  timeText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 4,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    zIndex: 4,
    margin: 20,
  },
  arrowBackdrop: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#000',
    opacity: 0.4,
    borderRadius: 50,
  },
  arrow: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 4,
    color: '#fff',
  },
  likeContainer: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },

  titleBar: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 3,
    // position: 'absolute',
    height: 50,
    // zIndex: 10,
    position: 'absolute',
    top: 200,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    // marginBottom: -15,
    // zIndex: 10,
    // position: 'absolute',
    // top: 200,
  },
});
export default AddRecipe;
