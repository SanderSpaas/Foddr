// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import ProgressBar from 'react-native-progress/Bar';
import Camera from '../components/Camera.js';
import Ingredient from '../components/Ingredient.component.js';
import Instruction from '../components/Instruction.component.js';
import Modal from '../components/Modal.js';
import Timer from '../components/Timer.component.js';
import ToggableButton from '../components/ToggableButton.js';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
const auth = firebase.auth();
const db = firebase.firestore();

let amountofPages = 11;
const AddRecipe = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [error, setError] = useState('');
  const [instructions, setInstructions] = useState(['']);
  const [timers, setTimers] = useState([0]);
  const [height, setHeight] = useState(35);
  const [ingredients, setIngredients] = useState([
    {name: '', amount: '', unitOfMeasure: ''},
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

  const handleUri = (fileUri, base64) => {
    setFormData({
      ...formData,
      fileUri: fileUri,
      base64: base64,
    });
    setValid(true);
  };
  function recipeCallBack(data) {
    //check if instructions is empty
    setInstructions(data);
    console.log('instructions: ' + JSON.stringify(instructions));
    if (instructions.length === 0 || instructions[0] === '') {
      setError('Please add at least one instruction');
      setValid(false);
    } else {
      setError('');
      setValid(true);
    }
  }
  function recipeCallBackIng(data) {
    //check if ingredients is empty
    console.log('i think therefore i am: ' + JSON.stringify(data));
    setIngredients(data);
    if (ingredients.length === 0 || ingredients[0] === '') {
      setError('Please add at least one ingredient');
      setValid(false);
    } else {
      setError('');
      setValid(true);
    }
    console.log('ingredf: ' + JSON.stringify(ingredients));
  }
  function recipeCallBackTimer(data) {
    //check if timers is empty
    setTimers(data);
    console.log('timers: ' + JSON.stringify(instructions));
    if (timers.length === 0 || timers[0] === '') {
      setError('Please add at least one timer');
      setValid(false);
    } else {
      setError('');
      setValid(true);
    }
  }
  function talkToParent(data) {
    //for the seasonbuttons
    setFormData({
      ...formData,
      [data]: !formData[data],
    });
    console.log('formData', formData);
    //check if all seasons are false
    let allSeasonsFalse = Object.entries(formData).every(
      ([key, value]) =>
        (key === 'fall' ||
          key === 'winter' ||
          key === 'spring' ||
          key === 'summer') &&
        value === false,
    );
    console.log('allSeasonsFalse', allSeasonsFalse);
    if (allSeasonsFalse) {
      setError('Please select at least one season');
      setValid(false);
    } else {
      setError('');
      setValid(true);
    }
  }

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
              amountOfPeople: formData.amountOfPeople,
              ingredients: ingredients,
              instructions: instructions,
              timers: timers,
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
      if (page === amountofPages - 1) {
        setValid(true);
      }
      setPage(page + 1);
    }
  };
  function checkIfEmpty(value, option) {
    if (value === '') {
      // alert('Please fill in the ' + name);
      setError('Please fill in the ' + option);
      setValid(false);
      setFormData({
        ...formData,
        [option]: value,
      });
    } else {
      setValid(true);
      setError('');
      setFormData({
        ...formData,
        [option]: value,
      });
    }
  }
  function cleanUp() {
    //alles gaan resetten in de states
    setFormData({});
    setIngredients([]);
    setInstructions([]);
    setPage(0);
    setPostPage(false);
    console.log('cleaned up');
    navigation.navigate('Browse');
  }
  const pageSwitcher = () => {
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
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              contentContainerStyle={{
                top: 80,
              }}>
              <Image
                style={styles.image}
                source={require('../assets/images/name.png')}
                resizeMode="contain"
              />

              <Text style={globalStyles.label}>Fill in the recipe name</Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                onChangeText={value => checkIfEmpty(value, 'name')}
                value={formData.name}
                style={[styles.colordBorder, globalStyles.textInput]}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        );
      case 2:
        return (
          <ScrollView>
            <Image
              style={styles.image}
              source={require('../assets/images/name.png')}
              resizeMode="contain"
            />

            <View>
              <Text style={globalStyles.label}>
                Tell me something about the recipe
              </Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                multiline={true}
                onContentSizeChange={event => {
                  setHeight(Math.max(35, event.nativeEvent.contentSize.height));
                }}
                onChangeText={value => checkIfEmpty(value, 'description')}
                value={formData.description}
                style={[
                  styles.colordBorder,
                  globalStyles.textInput,
                  {
                    height: height,
                    maxHeight: 150,
                  },
                ]}
              />
            </View>
          </ScrollView>
        );
      case 3:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/name.png')}
              resizeMode="contain"
            />

            <View>
              <Text style={globalStyles.label}>
                Fill in the amount of people
              </Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                keyboardType="numeric"
                onChangeText={value =>
                  checkIfEmpty(value.replace(/[^0-9]/g, ''), 'amountOfPeople')
                }
                maxLength={2}
                value={formData.amountOfPeople}
                style={[styles.colordBorder, globalStyles.textInput]}
              />
            </View>
          </>
        );
      case 4:
        return (
          <>
            <View
              style={{
                height: Dimensions.get('window').height - 450,
              }}>
              <Text style={globalStyles.label}>Fill in the instuctions</Text>
              <View style={[styles.colordBorder, styles.instructions]}>
                <Instruction
                  recipeCallBack={recipeCallBack}
                  instructions={instructions}
                />
              </View>
            </View>
          </>
        );
      case 5:
        return (
          <>
            <View>
              <Text style={globalStyles.label}>
                In which seasons does this recipe belong?
              </Text>
            </View>
            <View style={styles.seasonsBox}>
              <ToggableButton
                talkToParent={talkToParent}
                text={'???? Fall ????'}
                id={'fall'}
                color={'#ffa289'}
                enabled={formData.fall}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'??? Winter ??????'}
                id={'winter'}
                color={'#6595cb'}
                enabled={formData.winter}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={'???? Spring ????'}
                id={'spring'}
                color={'#ffb9d6'}
                enabled={formData.spring}
              />
              <ToggableButton
                talkToParent={talkToParent}
                text={' ?????????? Summer ???'}
                id={'summer'}
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
                onPress={e => {
                  setMarker(e.nativeEvent.coordinate);
                  setValid(true);
                }}>
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
            <Text style={styles.title}>How long does it take to prepare?</Text>
            <View>
              <Text style={globalStyles.label}>Time in minutes</Text>
              <TextInput
                placeholderTextColor={colors.textcolor}
                placeholder="0"
                onChangeText={value =>
                  checkIfEmpty(value.replace(/[^0-9]/g, ''), 'time')
                }
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

            <Camera handleUri={handleUri} uri={formData.fileUri} />
          </>
        );
      case 9:
        return (
          <>
            <Text style={styles.title}>What are the ingredients?</Text>
            <View
              style={[
                styles.colordBorder,
                styles.instructions,
                {
                  height: Dimensions.get('window').height - 400,
                },
              ]}>
              <View style={styles.legendaContainter}>
                <Text style={[globalStyles.label, {flex: 3}]}>Name</Text>
                <Text style={[globalStyles.label, {flex: 2}]}>Amount</Text>
                <Text style={[globalStyles.label, {flex: 4}]}>
                  Unit of measurement
                </Text>
              </View>

              <View
                style={{
                  height: Dimensions.get('window').height - 450,
                }}>
                <View style={[styles.colordBorder, styles.instructions]}>
                  <Ingredient
                    recipeCallBackIng={recipeCallBackIng}
                    ingredients={ingredients}
                  />
                </View>
              </View>
            </View>
          </>
        );
      case 10:
        return (
          <>
            <View
              style={{
                height: Dimensions.get('window').height - 450,
              }}>
              <Text style={globalStyles.label}>Add some timers</Text>
              <View style={[styles.colordBorder, styles.instructions]}>
                <Timer recipeCallBack={recipeCallBackTimer} timers={timers} />
              </View>
            </View>
          </>
        );
      case 11:
        return (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/logo-lg.png')}
              resizeMode="contain"
            />
            <Text style={styles.title}>Are you sure this is everything?</Text>
            {postPage && <Modal cleanUp={cleanUp} />}
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
      <KeyboardAvoidingView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        keyboardDismissMode="on-drag"
        keyboardVerticalOffset={200}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                  style={[globalStyles.buttonSmall]}
                  onPress={() => {
                    setPage(page - 1);
                    setValid(true);
                    setError('');
                  }}>
                  <Text style={globalStyles.buttonText}>Back</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                disabled={!valid}
                style={[
                  globalStyles.buttonSmall,
                  !valid ? {backgroundColor: '#8a91a5'} : {},
                ]}
                onPress={() => {
                  setValid(false);
                  handleSubmit();
                }}>
                <Text style={globalStyles.buttonText}>
                  {page === 0 || page < amountofPages ? 'Next' : 'Submit'}
                </Text>
              </TouchableOpacity>
              {error && (
                <Text
                  style={[
                    globalStyles.error,
                    {
                      position: 'absolute',
                      bottom: 50,
                      width: Dimensions.get('window').width * 0.55,
                    },
                  ]}>
                  {error}
                </Text>
              )}
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
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteText: {
    position: 'absolute',
    top: -75,
    zIndex: 5,
    backgroundColor: 'white',
    color: colors.textcolor,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.7,
    alignSelf: 'center',
    color: '#000',
  },

  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.6,
    // backgroundColor: colors.purple,
  },
  bottemNav: {
    backgroundColor: colors.backgroundcolor,
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.7,
    marginTop: 15,
    // backgroundColor: 'red',
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
    padding: 15,
    color: colors.textcolor,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  seasonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: Dimensions.get('window').width * 0.8,
    height: 250,
  },
});
export default AddRecipe;
