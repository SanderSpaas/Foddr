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
  Animated,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
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
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  async function getRecipe() {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('recipe');
      if (value !== null) {
        // We have data!!
        setRecipeData(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      console.log('er gaat iets fout');
      console.log(error);
    }
    setLoading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      getRecipe();
    }, []),
  );
  const [scrollYSticky, setScrollYSticky] = useState(new Animated.Value(0));
  const stickyHeaderHeight = 100;

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
  const screenHeight = Dimensions.get('window').height;
  return (
    // <SafeAreaView contentContainerStyle={styles.root}>
    <View style={{height: screenHeight}}>
      {recipeData !== null && recipeData !== undefined ? (
        <>
          <ImageHeader
            recipeData={recipeData}
            route={route}
            scrollY={scrollY}
            scrollYSticky={scrollYSticky}
          />
          <ScrollView
            // contentContainerStyle={styles.root}

            contentContainerStyle={{flexGrow: 1}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
              },
            )}>
            {/* <Text>blablable</Text> */}
            <View style={styles.recipe}>
              {/* <FlatList
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
            /> */}
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {recipeData.ingredients.map((item, index) => (
                  <Text style={styles.listItem} key={index}>
                    🍴{item.name} {item.amount}
                    {item.unitOfMeasure}
                  </Text>
                ))}
              </View>
              <View style={{padding: 10}}>
                {recipeData.instructions.map((item, index) => (
                  <Text style={styles.instructionItem} key={index}>
                    🥄{index}: {item}
                  </Text>
                ))}
              </View>
            </View>

            {/* </SafeAreaView> */}
          </ScrollView>
        </>
      ) : (
        // <Text>{recipeData.name}</Text>
        <Text>Pick a country</Text>
      )}
    </View>
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
    // flex: 1,
    // position: 'absolute',

    marginTop: 360,
    zIndex: 19,
    color: colors.textcolor,
    // backgroundColor: colors.pink,
    // height: 500,
    // width: 250,
  },
  listItem: {
    color: colors.textcolor,
    padding: 10,
    fontSize: 20,
    width: Dimensions.get('window').width * 0.5,
    // backgroundColor: colors.pink,
  },
  instructionItem: {
    color: colors.textcolor,
    padding: 10,
    fontSize: 20,
    // width: Dimensions.get('window').width * 1,
    flex: 1,
    // backgroundColor: colors.pink,
  },
});
export default Recipe;
