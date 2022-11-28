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
import Card from '../components/Card/Card.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import colors from '../theme/colors.js';
import SVGImg from '../assets/images/gradient.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Like from '../components/Like.js';
// import NumericInput from 'react-native-numeric-input';
const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);

  async function getRecipe(id) {
    setLoading(true);
    const recipe = await firestore().collection('recipes').doc(id).get();
    console.log(recipe._data);
    setRecipeData(recipe._data);
    setLoading(false);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update
      getRecipe(route.params.id);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../assets/images/wave.png')}
      />
      {recipeData !== null && recipeData !== undefined ? (
        <>
          <Text>We have our data</Text>
          <TouchableHighlight
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}>
            <>
              <FontIcon
                style={styles.arrow}
                name="arrow-left"
                size={20}
                solid
              />
              <View style={styles.arrowBackdrop}></View>
            </>
          </TouchableHighlight>
          <View style={styles.likeContainer}>
            <Like likes={recipeData.likes} recipeId={route.params.id} />
          </View>

          <View style={styles.imagecontainer}>
            <Text style={styles.titleText}>{recipeData.name}</Text>
            <Text style={styles.timeText}>{recipeData.time}min</Text>
            <Image style={styles.image} source={{uri: recipeData.image}} />
            <SVGImg
              style={styles.overlay}
              width={Dimensions.get('window').width}
              height={200}
            />
          </View>
          <View style={styles.titleBar}>
            <View>
              <Text style={styles.barText}>
                {recipeData.forPeople}Recipe ❤️ {route.params.id}
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
