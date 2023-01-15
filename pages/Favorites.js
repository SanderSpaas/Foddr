import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Image, StyleSheet,
  Text,
  View
} from 'react-native';
import Card from '../components/Card';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
const auth = firebase.auth();
const db = firebase.firestore();
const Favorites = ({ route, navigation }) => {
  useEffect(() => {
    //only do the isloading thing once
    const ref = firebase.firestore().collection('recipes');
    setLoading(true);
    const subscriber = ref.onSnapshot(snapshot => {
      let recipesArray = [];
      setRecipeData([]);
      // recipesArray = recipeData;
      snapshot.forEach(doc => {
        if (doc.data().likes.includes(auth.currentUser.uid)) {
          // console.log(
          //   doc.data().likes +
          //     ' : ' +
          //     auth.currentUser.uid +
          //     ' ' +
          //     doc.data().likes.includes(auth.currentUser.uid),
          // );
          recipesArray.push({
            id: doc.id,
            recipe: doc.data(),
          });
        }
      });
      setRecipeData(recipesArray);
      // console.log('recipesArray', recipesArray);
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
    <View contentContainerStyle={globalStyles.root}>
      <Image
        style={globalStyles.blob}
        source={require('../assets/images/wave.png')}
      />
      <View style={[globalStyles.titleBar]}>
        <View>
          <Text style={globalStyles.barText}>Your favorites ❤️</Text>
        </View>
      </View>
      {!loading ? (
        <FlatList
          data={recipeData}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.likedItems}
          renderItem={({ item }) => (
            <Card recipe={item.recipe} recipeId={item.id} vertical={true} />
          )}
        />
      ) : (
        <Text style={[styles.motivator, globalStyles.shadow]}>
          Go like some recipes 😉
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 110,
  },
  likedItems: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  },
});
export default Favorites;