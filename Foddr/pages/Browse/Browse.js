import React, {useState, useEffect} from 'react';
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
import Button from '../../components/Button/Button.js';
import Card from '../../components/Card';
// import {colors} from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Marker from 'react-native-maps';
// var MapView = require('react-native-maps');
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../theme/colors.js';
import {faker} from '@faker-js/faker';

const auth = firebase.auth();
const db = firebase.firestore();
const recipesArray = [];
const Browse = ({route, navigation}) => {
  function addTestItem() {
    firestore()
      .collection('recipes')
      .add({
        id: faker.random.alphaNumeric(15),
        image: 'https://loremflickr.com/640/480/food',
        // tags: []
        ingredients: [
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
          {
            'Unit of measure': 'gr',
            Amount: faker.random.numeric(2),
            Name: faker.word.noun(),
          },
        ],
        instructions: faker.lorem.paragraphs(5),
        name: faker.word.adjective() + ' ' + faker.word.noun(),
        rating: {
          amountOfRatings: 3,
          rating: 10,
        },
        likes: [],
        time: faker.random.numeric(2),
      })
      .then(() => {
        console.log('recipe added!');
      });
  }

  //TODO fetch all the recipes for the selected country

  //Fetching all the liked recipes from the user
  async function getRecipes() {
    const recipes = await (
      await firestore().collection('recipes').get()
    ).forEach(queryDocumentSnapshot => {
      recipesArray.push({
        id: queryDocumentSnapshot.id,
        recipe: queryDocumentSnapshot.data(),
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update
      getRecipes();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  // useEffect(() => {

  //     // setRecipeData(recipes);
  //     // console.log(recipes);
  //     console.log(recipesArray[0]);
  //   }

  //   // const user = await firestore().collection('Users').doc('ABC').get();
  // }, []);
  const [recipeData, setRecipeData] = useState();
  const [region, setRegion] = useState({
    latitude: 16.186533128908827,
    longitude: 1.52344711124897,
    latitudeDelta: 50.59454374963337,
    longitudeDelta: 4.682658165693283,
  });
  const [marker, setMarker] = useState({
    latitude: 16,
    longitude: 1,
    // latitudeDelta: 50,
    // longitudeDelta: 4,
  });

  const from = route?.params?.from;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image
        style={styles.blob}
        source={require('../../assets/images/wave.png')}
      />
      <View style={[styles.searchBar, styles.locationBar]}>
        <FontIcon
          style={styles.searchBarIcon}
          name="location-arrow"
          size={20}
          color={colors.textcolor}
        />
        <View>
          <Text style={styles.locationBarText}>Brugse Poort, Ghent</Text>
          <Text style={styles.locationBarCountry}>Belgium</Text>
        </View>
      </View>
      <View style={styles.searchBar}>
        <FontIcon
          style={styles.searchBarIcon}
          name="search"
          size={20}
          solid
          color={'#333333'}
        />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Enter recipe name"
        />
      </View>

      {/* <Text style={styles.title}>{`Browse (from ${from})`}</Text> */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          onPress={
            e => setMarker(e.nativeEvent.coordinate)
            // console.log(e.nativeEvent.coordinate)
          }
          onRegionChangeComplete={region => setRegion(region)}
        />

        {
          // if state contains marker variable with a valid value, render the marker
          marker !== '' && (
            <Marker
              style={styles.marker}
              // draggable
              pinColor="#4EAC9F"
              coordinate={marker}
              onDragEnd={e => setMarker(e.nativeEvent.coordinate)}
            />
          )
        }
      </View>
      <Text>{JSON.stringify(marker)}</Text>
      <View style={styles.buttons}>
        <TouchableHighlight onPress={() => {}}>
          <View style={[styles.Button, styles.locationButton]}>
            <FontIcon
              name="map-marker-alt"
              size={20}
              solid
              color={'#fff'}
              style={styles.Icon}
            />
            <Text style={styles.textcolor}>Use my location</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            addTestItem();
          }}>
          <View style={[styles.Button, styles.randomButton]}>
            <FontIcon
              name="dice"
              size={20}
              solid
              color={'#fff'}
              style={styles.Icon}
            />
            <Text style={styles.textcolor}>Random</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {}}>
          <View style={[styles.Button, styles.shareButton]}>
            <FontIcon name="share-alt" size={20} solid color={'#fff'} />
          </View>
        </TouchableHighlight>
      </View>

      {recipesArray !== null ? (
        <FlatList
          horizontal={true}
          data={recipesArray}
          keyExtractor={item => item.id}
          style={{height: 250}}
          renderItem={({item}) => (
            // <Text>{item.recipe.name}</Text>
            <Card
              name={item.recipe.name}
              imgUrl={item.recipe.image}
              rating={(
                item.recipe.rating.rating / item.recipe.rating.amountOfRatings
              ).toFixed(1)}
              time={item.recipe.time}
              likes={item.recipe.likes}
              recipeId={item.id}
            />
          )}
        />
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
  locationButton: {
    backgroundColor: '#4EAC9F',
  },
  randomButton: {
    backgroundColor: '#64578A',
  },
  shareButton: {
    backgroundColor: '#1D1334',
  },
  textcolor: {color: '#fff'},

  map: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').height * 0.35,
    // width: 50,
    // height: 50
  },
  marker: {
    // position: 'absolute',
    // width: 50,
    // height: 50,
    // left: 50,
    // top: 100,
    // zIndex: 4,
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
  searchBar: {
    width: Dimensions.get('window').width * 0.85,

    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
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
    color: '#000',
    borderRadius: 3,
  },
  searchBarInput: {
    color: colors.textcolor,
    width: 500,
    paddingLeft: 15,
  },
  searchBarIcon: {
    marginLeft: 10,
  },
  locationBar: {
    position: 'absolute',
    height: 50,
    borderRadius: 3,
  },
  locationBarText: {
    color: colors.textcolor,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  locationBarCountry: {
    color: colors.textcolor,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  blob: {
    width: Dimensions.get('window').width,
    height: 110,
    marginBottom: -15,
  },
});
export default Browse;
