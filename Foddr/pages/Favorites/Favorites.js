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
  SafeAreaView,
} from 'react-native';
import Button from '../../components/Button/Button.js';
import Card from '../../components/Card';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import functions from '@react-native-firebase/functions';
import colors from '../../theme/colors.js';
const auth = firebase.auth();
const db = firebase.firestore();
const {uid} = auth.currentUser;
let recipesArray = [];

const Favorites = ({route, navigation}) => {
  //TODO fetch all the recipes for the selected country
  async function getLikes() {
    recipesArray.length = 0;
    const recipes = await (
      await firestore().collection('recipes').get()
    ).forEach(queryDocumentSnapshot => {
      if (queryDocumentSnapshot.data().likes.includes(uid)) {
        // console.log(
        //   queryDocumentSnapshot.data().likes +
        //     ' : ' +
        //     uid +
        //     ' ' +
        //     queryDocumentSnapshot.data().likes.includes(uid),
        // );
        recipesArray.push({
          id: queryDocumentSnapshot.id,
          recipe: queryDocumentSnapshot.data(),
        });
        //hier
      }
    });
    // console.log(recipesArray);
    setRecipeData(recipesArray);

    // return recipesList;
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action recipesArray
      getLikes();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const [recipeData, setRecipeData] = useState();
  const from = route?.params?.from;
  return (
    <SafeAreaView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../../assets/images/wave.png')}
      />
      <View style={[styles.titleBar, styles.locationBar]}>
        <View>
          <Text style={styles.barText}>Your favorites ❤️</Text>
        </View>
      </View>
      {/* <Text>{recipeData}</Text> */}
      {recipeData !== null ? (
        <FlatList
          // horizontal={true}
          data={recipesArray}
          keyExtractor={item => item.id}
          // style={{ justifyContent: 'center' }}
          contentContainerStyle={styles.likedItems}
          renderItem={({item}) => (
            // <Text>{item.recipe.name}</Text>
            <Card
              name={item.recipe.name}
              imgUrl={item.recipe.image}
              rating={[
                item.recipe.rating.rating,
                item.recipe.rating.amountOfRatings,
              ]}
              time={item.recipe.time}
              likes={item.recipe.likes}
              recipeId={item.id}
              vertical={true}
            />
          )}
        />
      ) : (
        <Text>Go like some recipes 🥺🤧🤪</Text>
      )}
      {/* {recipeData !== null ? (
        <FlatList
          horizontal={true}
          data={recipeData}
          style={{height: 250}}
          renderItem={({item}) => (
            <Card
              name={item._data.name}
              rating={(
                item._data.rating.rating / item._data.rating.amountOfRatings
              ).toFixed(1)}
              time={item._data.time}
              imgUrl={item._data.image}
            />

            // <Text>{item.instructions}</Text>
          )}
        />
      ) : (
        <Text>Pick a country</Text>
      )} */}
    </SafeAreaView>
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
  likedItems: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
export default Favorites;
