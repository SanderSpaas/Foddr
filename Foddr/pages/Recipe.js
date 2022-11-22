// import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {images} from 'theme';
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
import Card from '../components/Card/Card.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import colors from '../theme/colors.js';
const auth = firebase.auth();
const db = firebase.firestore();

const Recipe = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);

  async function getRecipe(id) {
    setLoading(true);
    const data = (
      await firestore()
        .collection('recipes')
        // Filter results
        .where('id', '==', id)
        .limit(1)
        .get()
    ).docs;
    // console.log(data[0]._data);
    setRecipeData(data[0]._data);
    console.log('dit is de recipeData ' + recipeData.name);
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
    <ScrollView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../assets/images/wave.png')}
      />
      <View style={[styles.titleBar, styles.locationBar]}>
        <View>
          <Text style={styles.barText}>Recipe ❤️ {route.params.id}</Text>
        </View>
      </View>

      {/* {loading === false ? (
       
      ) : (
        <Text>Pick a country</Text>
      )} */}
      {recipeData !== null && loading === false ? (
        <Text>{recipeData}</Text>
      ) : (
        <Text>Pick a country</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCF9F2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },

  Button: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    // width: Dimensions.get('window').width * 0.5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    // overflow:'hidden',
    marginBottom: 20,
  },
  Icon: {
    marginRight: 10,
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
    position: 'absolute',
    height: 50,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    marginBottom: -15,
  },
});
export default Recipe;
