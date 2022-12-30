import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Animated, Dimensions, FlatList, ScrollView, StyleSheet,
  Text,
  View
} from 'react-native';
import Card from '../components/Card.js';
import ImageHeaderTitle from '../components/ImageHeaderTitle.js';
import Loader from '../components/Loader';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
const db = firebase.firestore();
const styles = StyleSheet.create({
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
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrollYSticky, setScrollYSticky] = useState(new Animated.Value(0));
  const stickyHeaderHeight = 100;
  const screenHeight = Dimensions.get('window').height;

  if (scrollY > stickyHeaderHeight) {
    Animated.spring(scrollYSticky, {
      toValue: scrollY - stickyHeaderHeight,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(scrollYSticky, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
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
      // console.log('recipesArray', recipesArray);
      setLoading(false);
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={{height: screenHeight, backgroundColor: 'white'}}>
      <ImageHeaderTitle
        title={'Discover Recipes'}
        scrollY={scrollY}
        scrollYSticky={scrollYSticky}
        imgUrl={require('../assets/images/banner.jpg')}
      />
      <Loader loading={loading} />
      {!loading ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: false,
            },
          )}>
          <View style={{marginTop: 260}}>
            <Text style={styles.title}>Winter Recipes</Text>
            <FlatList
              data={recipeData.filter(
                recipeData =>
                  //this checks if the winter seasons is true
                  Object.entries(recipeData.recipe.seasons)[0][1],
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
              data={recipeData.filter(
                //this checks if the fall seasons is true
                recipeData => Object.entries(recipeData.recipe.seasons)[1][1],
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
              data={recipeData.filter(
                recipeData =>
                  //this checks if the spring seasons is true
                  Object.entries(recipeData.recipe.seasons)[3][1],
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
          <View style={{marginBottom: 80}}>
            <Text style={styles.title}>Summer Recipes</Text>
            <FlatList
              data={recipeData.filter(
                recipeData =>
                  //this checks if the summer seasons is true
                  Object.entries(recipeData.recipe.seasons)[2][1],
              )}
              keyExtractor={item => item.id}
              style={styles.list}
              horizontal={true}
              contentContainerStyle={styles.likedItems}
              renderItem={({item}) => (
                <Card
                  recipe={item.recipe}
                  recipeId={item.id}
                  vertical={true}
                  style={{padding: 80, marginBottom: 100}}
                />
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
