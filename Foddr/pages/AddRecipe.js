// import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
// import {images} from 'theme';
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
} from 'react-native';
import {SvgUri} from 'react-native-svg';

import {Keyboard} from 'react-native';
import Card from '../components/Card/Card.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import colors from '../theme/colors.js';
import SVGImg from '../assets/images/gradient.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Like from '../components/Like.js';
import ToggableButton from '../components/ToggableButton.js';
import Instruction from '../components/Instruction.component.js';
import AddInStruction from '../components/AddInstruction.component.js';
// import NumericInput from 'react-native-numeric-input';
const auth = firebase.auth();
const db = firebase.firestore();

const AddRecipe = ({route, navigation}) => {
  // const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const [instruction, setInstruction] = useState([]);
  function talkToParent(data) {
    console.log(data); // LOGS DATA FROM CHILD
  }
  handleCallback = value => {
    setInstruction(current => [...current, value]);
    Keyboard.dismiss();
  };
  deleteCallback = index => {
    console.log('removing item at index: ' + index);
    let instructionArray = instruction;
    instructionArray.splice(index, 1);
    console.log(instructionArray);
    setInstruction(instructionArray);
    console.log(instruction);
  };
  // async function getRecipe(id) {
  //   setLoading(true);
  //   const recipe = await firestore().collection('recipes').doc(id).get();
  //   console.log(recipe._data);
  //   setRecipeData(recipe._data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action and update
  //     getRecipe(route.params.id);
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.layout}>
      {/* <Image
        style={styles.blob}
        source={require('../assets/images/wave.png')}
      /> */}
      <Text style={styles.title}>What is the recipe called?</Text>
      <View>
        <TextInput
          placeholderTextColor={colors.textcolor}
          placeholder="Fill in the recipe name"
          style={[styles.colordBorder, styles.textInput]}
        />
      </View>
      <Text style={styles.title}>
        In which seasons does this recipe belong?
      </Text>
      <View style={styles.seasonsBox}>
        <ToggableButton
          talkToParent={talkToParent}
          text={'🍁 Fall 🍂'}
          color={'#ed4d1d'}
        />
        <ToggableButton
          talkToParent={talkToParent}
          text={'⛄ Winter ❄️'}
          color={'#008bea'}
        />
        <ToggableButton
          talkToParent={talkToParent}
          text={'🌼 Spring 🌷'}
          color={'#ff6dc6'}
        />
        <ToggableButton
          talkToParent={talkToParent}
          text={' 🏵️️ Summer ⛅'}
          color={'#f9c23c'}
        />
      </View>
      <Text style={styles.title}>What are the ingredients?</Text>
      <Text style={styles.title}>What are the instructions?</Text>
      {/* <View>
        <TextInput
          multiline={true}
          style={[styles.colordBorder, styles.textInput, styles.textInputLong]}
        />
      </View> */}
    
      <FlatList
        data={instruction}
        // keyExtractor={item => item}
        style={[styles.colordBorder, styles.instructions]}
        renderItem={({item, index}) => (
          // <Text>{item.recipe.name}</Text>
          <Instruction
            instruction={item}
            index={index}
            key={index}
            deleteCallback={deleteCallback}
          />
        )}
      />
      <AddInStruction parentCallback={handleCallback} />
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

      {/* <View style={styles.imagecontainer}>
        <Text style={styles.titleText}>naam recept</Text>
        <Text style={styles.timeText}>25 min</Text>
        <Image
          style={styles.image}
          source={require('../assets/images/imagePlaceholder.png')}
        />
        <SVGImg
          style={styles.overlay}
          width={Dimensions.get('window').width}
          height={200}
        />
      </View>
      <View style={styles.titleBar}>
        <View>
          <Text style={styles.barText}>3people Recipe ❤️ titel recept</Text>
        </View>
      </View> */}
      {/* <Text>blablable</Text>
      <View style={styles.recipe}>
        <Text style={styles.text}>groene paprika 55gr</Text>
        <Text style={styles.text}>instructies</Text> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    color: colors.textcolor,
    textAlign: 'center',
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
    // borderTopColor: colors.firstColor,
    // borderRightColor: colors.secondColor,
    // borderBottomColor: colors.thirthColor,
    // borderLeftColor: colors.fourthColor,
  },
  textInput: {
    width: Dimensions.get('window').width * 0.9,
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
    width: Dimensions.get('window').width * 0.9,
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
    width: Dimensions.get('window').width * 0.85,
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
    marginBottom: -15,
    // zIndex: 10,
    position: 'absolute',
    top: 200,
  },
});
export default AddRecipe;
