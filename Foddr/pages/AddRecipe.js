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
  KeyboardAvoidingView,
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
import Like from '../components/Like.js';
import ToggableButton from '../components/ToggableButton.js';
import Instruction from '../components/Instruction.component.js';
import AddInStruction from '../components/AddInstruction.component.js';
import Camera from '../components/Camera.js';
import ProgressBar from 'react-native-progress/Bar';
import Ingredient from '../components/Ingredient.component.js';
import AddIngredient from '../components/AddIngredient.component.js';
import {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import globalStyles from '../theme/globalStyles.js';
const auth = firebase.auth();
const db = firebase.firestore();

let amountofPages = 10;
var docRef;
const AddRecipe = ({route, navigation}) => {
  // useEffect(() => {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);
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
    description: '',
    amountOfPeople: 0,
    fall: false,
    winter: false,
    spring: false,
    summer: false,
    time: 0,
    fileUri: '',
    base64: '',
  });
  const [reload, setReload] = useState(false);
  const [fileUri, setFileUri] = useState('');
  const [page, setPage] = useState(0);
  const [postPage, setPostPage] = useState(false);
  const [marker, setMarker] = useState({
    latitude: 51,
    longitude: 4,
  });
  const [region, setRegion] = useState({
    latitude: 51.186533128908827,
    longitude: 4.52344711124897,
    latitudeDelta: 50.59454374963337,
    longitudeDelta: 4.682658165693283,
  });
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
  }

  const handleUri = (fileUri, base64) => {
    setFormData({
      ...formData,
      fileUri: fileUri,
      base64: base64,
    });
  };
  function handleCallbackIng() {
    //TODO let the user add the amount of people the recipe is for
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
      // gaan nakijken of alles ingevuld is
      // Upload the image to Firebase Storage
      const fileUploadTask = storage()
        .ref(formData.name + '.jpeg')
        .putString(formData.base64, firebase.storage.StringFormat.BASE64);

      fileUploadTask.then(() => {
        // Get the URL of the uploaded image
        fileUploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('downloadURL', downloadURL);
          // Create a new document in Firestore with the recipe data
          firestore()
            .collection('recipes')
            .add({
              name: formData.name,
              description: formData.description,
              image: downloadURL,
              longitude: marker.longitude,
              latitude: marker.latitude,
              // tags: []
              amountOfPeople: formData.amountOfPeople,
              ingredients: ingredients,
              instructions: instructions,

              rating: {
                amountOfRatings: 0,
                rating: 0,
              },
              likes: [],
              time: formData.time,
              seasons: {
                fall: formData.fall,
                winter: formData.winter,
                spring: formData.spring,
                summer: formData.summer,
              },
            })
            .then(() => {
              console.log('recipe added!');
            });
        });
        setPostPage(true);
      });
    } else {
      setPage(page + 1);
    }
  };
  function cleanUp() {
    //alles gaan resetten in de states
    setFormData({});
    setIngredients([]);
    setInstructions([]);
    setPage(0);
    setPostPage(false);
    navigation.navigate('Browse');
  }
  const pageSwitcher = () => {
    // console.log(JSON.stringify(formData));
    // console.log(JSON.stringify(instructions));
    // console.log(JSON.stringify(ingredients));
    switch (page) {
      case 0:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/recipe.png')}
              resizeMode="contain"
            />
            <Text style={styles.titleSmall}>
              Go through the steps to add a recipe.
            </Text>
          </>
        );
      case 1:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/name.png')}
              resizeMode="contain"
            />
            {/* <Text style={styles.title}>What is the recipe called?</Text> */}
            <View>
              <Text style={globalStyles.label}>Fill in the recipe name</Text>
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
                style={[styles.colordBorder, globalStyles.textInput]}
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/name.png')}
              resizeMode="contain"
            />
            {/* <Text style={styles.title}>
              What is the description of the recipe?
            </Text> */}
            <View>
              <Text style={globalStyles.label}>
                Tell me something about the recipe
              </Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                multiline={true}
                onChangeText={value =>
                  setFormData({
                    ...formData,
                    description: value,
                  })
                }
                value={formData.description}
                style={[
                  styles.colordBorder,
                  globalStyles.textInput,
                  globalStyles.textInputLong,
                ]}
              />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/name.png')}
              resizeMode="contain"
            />
            {/* <Text style={styles.title}>For how many people is the recipe?</Text> */}
            <View>
              <Text style={globalStyles.label}>
                Fill in the amount of people
              </Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                keyboardType="numeric"
                onChangeText={value =>
                  setFormData({
                    ...formData,
                    amountOfPeople: value,
                  })
                }
                value={formData.amountOfPeople}
                style={[styles.colordBorder, globalStyles.textInput]}
              />
            </View>
          </>
        );
      case 4:
        return (
          <>
            {/* <Text style={styles.title}>What are the instructions?</Text> */}
            <View>
              <Text style={globalStyles.label}>Fill in the instuctions</Text>
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
            </View>
          </>
        );
      case 5:
        return (
          <>
            {/* <Text style={styles.title}>
              In which seasons does this recipe belong?
            </Text> */}
            <View>
              <Text style={globalStyles.label}>
                In which seasons does this recipe belong?
              </Text>
            </View>
            <View style={styles.seasonsBox}>
              <ToggableButton
                talkToParent={talkToParent}
                text={'🍁 Fall 🍂'}
                color={'#ffa289'}
                enabled={formData.fall}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'⛄ Winter ❄️'}
                color={'#6595cb'}
                enabled={formData.winter}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'🌼 Spring 🌷'}
                color={'#ffb9d6'}
                enabled={formData.spring}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={' 🏵️️ Summer ⛅'}
                color={'#f5de7e'}
                enabled={formData.summer}
              />
            </View>
          </>
        );
      case 6:
        return (
          <>
            <Text style={[styles.absoluteText, globalStyles.shadow]}>
              Where does it come from?
            </Text>
            <View style={styles.container}>
              <MapView
                clusterColor={'#4EAC9F'}
                style={globalStyles.map}
                clustering={true}
                region={region}
                onPress={
                  e => setMarker(e.nativeEvent.coordinate)
                  // console.log(e.nativeEvent.coordinate)
                }>
                <Marker coordinate={marker}></Marker>
              </MapView>
            </View>
          </>
        );
      case 7:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/cookingTime.png')}
              resizeMode="contain"
            />
            {/* <Text style={styles.title}>How long does it take to prepare?</Text> */}
            <View>
              <Text style={globalStyles.label}>Time in minutes</Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                // placeholder="Minutes"
                onChangeText={value => setFormData({...formData, time: value})}
                keyboardType="numeric"
                maxLength={5}
                value={formData.time}
                style={[styles.colordBorder, globalStyles.textInput]}
              />
            </View>
          </>
        );
      case 8:
        return (
          <>
            <Text style={styles.title}>Add a picture</Text>
            {/* <Text style={globalStyles.label}>Add a picture</Text> */}
            <Camera handleUri={handleUri} uri={formData.fileUri} />
          </>
        );
      case 9:
        return (
          <>
            
            <Text style={styles.title}>What are the ingredients?</Text>
            <View style={[styles.colordBorder, styles.instructions]}>
              <View style={styles.legendaContainter}>
                <Text style={globalStyles.label}>Name</Text>
                <Text style={globalStyles.label}>amount</Text>
                <Text style={globalStyles.label}>unit of measurement</Text>
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
      case 10:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/logo-lg.png')}
              resizeMode="contain"
            />
            <Text style={styles.title}>Are you sure this is everything?</Text>
            {postPage && (
              <>
                <View style={styles.modalBackdrop}></View>
                <View style={[styles.modal, globalStyles.shadow]}>
                  <Image
                    style={styles.imageModal}
                    source={require('../assets/images/logo-lg.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.textModal}>
                    Thank you for sharing your epic recipe with us!
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={() => cleanUp()}>
                    <Text style={styles.textButtonModal}>Check it out</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    <View style={styles.layout}>
      <Image
        style={globalStyles.blob}
        source={require('../assets/images/wave.png')}
      />
      <View style={styles.center}>{pageSwitcher()}</View>
      {!postPage && (
        <View style={styles.bottemNav}>
          <View style={styles.buttonContainer}>
            {page > 0 && (
              <TouchableOpacity
                style={globalStyles.buttonSmall}
                onPress={() => setPage(page - 1)}>
                <Text style={globalStyles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={globalStyles.buttonSmall}
              onPress={handleSubmit}>
              <Text style={globalStyles.buttonText}>
                {page === 0 || page < amountofPages ? 'Next' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.layout}>
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
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.backgroundcolor,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    top: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  imageModal: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    // position: 'absolute',
    // backgroundColor: colors.purple,
  },
  textModal: {
    color: colors.textcolor,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.6,
    padding: 20,
    fontSize: 18,
  },

  buttonModal: {
    backgroundColor: colors.maincolor,
    padding: 15,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.4,
  },
  textButtonModal: {color: '#fff', textAlign: 'center', fontSize: 18},

  absoluteText: {
    position: 'absolute',
    top: -75,
    zIndex: 5,
    backgroundColor: colors.backgroundcolor,
    color: colors.textcolor,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    color: '#000',
  },

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
  bottemNav: {
    backgroundColor: colors.backgroundcolor,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.7,
    marginTop: 15,
    marginBottom: 15,
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
  },
  titleSmall: {
    fontSize: 20,
    color: colors.textcolor,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  seasonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  instructions: {
    width: Dimensions.get('window').width * 0.8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: Dimensions.get('window').width * 0.8,
    height: 250,
    // position: 'absolute',
    // backgroundColor: colors.purple,
  },
});
export default AddRecipe;
