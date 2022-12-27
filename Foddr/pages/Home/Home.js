import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button.js';
import auth from '@react-native-firebase/auth';
import SVGImg from '../../assets/images/current-location-icon.svg';
import LocationButton from '../../components/LocationButton.js';
import RandomButton from '../../components/RandomButton.js';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import {WebView} from 'react-native-webview';
import SeasonButton from '../../components/SeasonButton.js';
import globalStyles from '../../theme/globalStyles.js';
import Card from '../../components/Card.js';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../theme/colors.js';
// const auth = firebase.auth();
const db = firebase.firestore();
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.lightGrayPurple,
    backgroundColor: '#f7f7fb',
  },
  title: {
    color: colors.maincolor,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
});
const Home = ({navigation}) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataRender, setRecipeDataRender] = useState([]);
  const [loading, setLoading] = useState(false);

  function showRecipe(recipeSeasons, season) {
    console.log('recipeSeasons[season]', Object.entries(recipeSeasons)[season]);
    if (Object.entries(recipeSeasons)[season][1]) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const ref = firebase.firestore().collection('recipes');
    setLoading(true);
    const subscriber = ref.onSnapshot(snapshot => {
      let recipesArray = [];
      setRecipeData([]);
      snapshot.forEach(doc => {
        // console.log('doc.id', doc.id + ': ' + doc.data().name);
        recipesArray.push({
          id: doc.id,
          recipe: doc.data(),
        });
      });
      setRecipeData(recipesArray);
      console.log('recipesArray', recipesArray);
      setLoading(false);
      // setRecipeDataRender(recipesArray);
      // filterRecipes();
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  return (
    <View style={styles.root}>
      {/* <StatusBar barStyle="light-content" /> */}
      {!loading ? (
        <ScrollView>
          <View>
            <Text style={styles.title}>Winter Recipes</Text>
            <FlatList
              data={recipeData.filter(recipeData =>
                showRecipe(recipeData.recipe.seasons, 0),
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              horizontal={true}
              contentContainerStyle={styles.likedItems}
              renderItem={({item}) => (
                <Card recipe={item.recipe} recipeId={item.id} vertical={true} />
              )}
            />
          </View>
          <View>
            <Text style={styles.title}>Autumn Recipes</Text>
            <FlatList
              data={recipeData.filter(recipeData =>
                showRecipe(recipeData.recipe.seasons, 1),
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              horizontal={true}
              contentContainerStyle={styles.likedItems}
              renderItem={({item}) => (
                <Card recipe={item.recipe} recipeId={item.id} vertical={true} />
              )}
            />
          </View>

          <View>
            <Text style={styles.title}>Spring Recipes</Text>
            <FlatList
              data={recipeData.filter(recipeData =>
                showRecipe(recipeData.recipe.seasons, 3),
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              horizontal={true}
              contentContainerStyle={styles.likedItems}
              renderItem={({item}) => (
                <Card recipe={item.recipe} recipeId={item.id} vertical={true} />
              )}
            />
          </View>
          <View>
            <Text style={styles.title}>Summer Recipes</Text>
            <FlatList
              data={recipeData.filter(recipeData =>
                showRecipe(recipeData.recipe.seasons, 2),
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              horizontal={true}
              contentContainerStyle={styles.likedItems}
              renderItem={({item}) => (
                <Card recipe={item.recipe} recipeId={item.id} vertical={true} />
              )}
            />
          </View>
          
        </ScrollView>
      ) : (
        <Text style={[styles.motivator, globalStyles.shadow]}>
          Go make some recipes 😉
        </Text>
      )}
    </View>
  );
};

export default Home;
