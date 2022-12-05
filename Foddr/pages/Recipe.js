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
} from 'react-native';
import {SvgUri} from 'react-native-svg';
// import Card from '../components/Card/Card.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import functions from '@react-native-firebase/functions';
import colors from '../theme/colors.js';
import {useFocusEffect} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import Rating from '../components/Rating.js';
import ImageHeader from '../components/ImageHeader.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import NumericInput from 'react-native-numeric-input';
const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);

  async function getRecipe(id) {
    let interID = id;
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        // We have data!!
        interID = value;
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log('er gaat iets fout');
      console.log(error);
    }
    const recipe = await firestore().collection('recipes').doc(interID).get();
    // console.log(recipe._data);
    setRecipeData(recipe._data);
    setLoading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      //this doenst work because of the stupid bug
      let {id} = route.params;
      // console.log(route);
      // console.log(navigation.params);
      // console.log(id);
      getRecipe(id);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // route.params = null;
      };
    }, []),
  );

  return (
    <SafeAreaView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../assets/images/wave.png')}
      />
      {recipeData !== null && recipeData !== undefined ? (
        <>
          <ImageHeader recipeData={recipeData} route={route} />
          <View style={styles.titleBar}>
            <View>
              <Text style={styles.barText}>
                {recipeData.forPeople}
                <FontIcon
                  // style={styles.arrow}
                  name="portrait"
                  size={25}
                  color={colors.secondarycolor}
                />

                {/* Recipe ❤️ {route.params.id} */}
                <Rating
                  rating={[
                    recipeData.rating.rating,
                    recipeData.rating.amountOfRatings,
                  ]}
                />
              </Text>
              {/* <NumericInput
                minValue={1}
                type="up-down"
                onChange={value => console.log(value)}
              /> */}
            </View>
          </View>
          <Text>blablable</Text>
          <View style={styles.recipe}>
            <FlatList
              data={recipeData.ingredients}
              // keyExtractor={item => item.name}
              style={{height: 250}}
              renderItem={({item}) => (
                // <Text>{item.recipe.name}</Text>
                <View style={styles.ingredient}>
                  <FontIcon
                    // style={styles.arrow}
                    name="asterisk"
                    size={15}
                    color={colors.textcolor}
                  />
                  <Text style={styles.text}>
                    {item.Name} {item.Amount}gr
                  </Text>
                </View>
              )}
            />
            <Text style={styles.text}>{recipeData.instructions}</Text>
          </View>
        </>
      ) : (
        // <Text>{recipeData.name}</Text>
        <Text>Pick a country</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundcolor,
  },
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
    zIndex: 19,
    color: colors.textcolor,
    // backgroundColor: colors.pink,
    height: 500,
    width: 250,
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
export default Recipe;
