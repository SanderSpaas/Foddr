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

const Favorites = ({route, navigation}) => {
  useEffect(() => {
    //only do the isloading thing once
    const ref = firebase.firestore().collection('recipes');
    setLoading(true);
    const subscriber = ref.onSnapshot(snapshot => {
      let recipesArray = [];
      setRecipeData([]);
      // recipesArray = recipeData;
      snapshot.forEach(doc => {
        if (doc.data().likes.includes(uid)) {
          console.log(
            doc.data().likes +
              ' : ' +
              uid +
              ' ' +
              doc.data().likes.includes(uid),
          );
          recipesArray.push({
            id: doc.id,
            recipe: doc.data(),
          });
        }
      });
      setRecipeData(recipesArray);
      console.log('recipesArray', recipesArray);
      setLoading(false);
      // filterRecipes();
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const from = route?.params?.from;
  return (
    <SafeAreaView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../../assets/images/wave.png')}
      />
      <View style={[styles.titleBar]}>
        <View>
          <Text style={styles.barText}>Your favorites ❤️</Text>
        </View>
      </View>
      {!loading ? (
        <FlatList
          data={recipeData}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.likedItems}
          renderItem={({item}) => (
            <Card
              recipe={item.recipe}
              // name={item.recipe.name}
              // imgUrl={item.recipe.image}
              // rating={[
              //   item.recipe.rating.rating,
              //   item.recipe.rating.amountOfRatings,
              // ]}
              // time={item.recipe.time}
              // likes={item.recipe.likes}
              recipeId={item.id}
              vertical={true}
            />
          )}
        />
      ) : (
        <Text style={styles.motivator}>Go like some recipes 😉</Text>
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
    backgroundColor: colors.maincolor,
  },
  Button: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    // width: Dimensions.get('window').width * 0.5,
  },
  list: {
    // marginTop: 70,
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
    zIndex: 2,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    marginBottom: -15,
    zIndex: 1,
  },
  motivator: {
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.4,
    backgroundColor: colors.maincolor,
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.7,
    fontSize: 20,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 3,
  },
});
export default Favorites;
