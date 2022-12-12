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
  // WebView,
  FlatList,
} from 'react-native';
import Button from '../../components/Button/Button.js';
import MapCard from '../../components/MapCard.js';
// import {colors} from '../../theme/colors.js';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Callout,
} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
// import MapMarker from 'react-native-maps';
// var MapView = require('react-native-maps');
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../theme/colors.js';
import {faker, VehicleModule} from '@faker-js/faker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  CommonActions,
  TabActions,
} from '@react-navigation/native';
import SVGImg from '../../assets/images/current-location-icon.svg';
import LocationButton from '../../components/LocationButton.js';
import RandomButton from '../../components/RandomButton.js';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import {WebView} from 'react-native-webview';
const auth = firebase.auth();
const db = firebase.firestore();
const recipesArray = [];
const Browse = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(false);
  const [region, setRegion] = useState({
    latitude: 16.186533128908827,
    longitude: 1.52344711124897,
    latitudeDelta: 30.59454374963337,
    longitudeDelta: 1.682658165693283,
  });
  const [marker, setMarker] = useState({
    latitude: 16,
    longitude: 1,
    // latitudeDelta: 50,
    // longitudeDelta: 4,
  });
  const mapViewRef = useRef(MapView);
  function addTestItem() {
    firestore()
      .collection('recipes')
      .add({
        // id: faker.random.alphaNumeric(15),
        image: 'https://loremflickr.com/640/480/food',
        longitude: faker.random.numeric(2),
        latitude: faker.random.numeric(2),
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
  // async function getRecipes() {
  //   setLoading(true);
  //   recipesArray.length = 0;
  //   const recipes = await (
  //     await firestore().collection('recipes').get()
  //   ).forEach(queryDocumentSnapshot => {
  //     recipesArray.push({
  //       id: queryDocumentSnapshot.id,
  //       recipe: queryDocumentSnapshot.data(),
  //     });
  //   });
  //   setRecipeData(recipesArray);
  //   setLoading(false);
  //   // console.log(recipeData);
  // }
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action and update
  //     getRecipes();
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    //only do the isloading thing once
    recipesArray.length = 0;
    const ref = firebase.firestore().collection('recipes');
    const subscriber = ref.onSnapshot(snapshot => {
      setLoading(true);
      snapshot.forEach(doc => {
        console.log('doc.id', doc.id);
        recipesArray.push({
          id: doc.id,
          recipe: doc.data(),
        });
      });

      setRecipeData(recipesArray);
      setInitialData(true);
      // console.log('loading', loading);
      // setLoading(false);
      // console.log('loading', loading);
      console.log('initialData', initialData);
      console.log('recipeData', recipeData);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  });

  // const [location, setLocation] = useState('No location selected');
  // function handleSelect(coordinate) {
  //   console.log(coordinate);
  //   setMarker(coordinate);
  //   Geocoder.from(coordinate.latitude, coordinate.longitude)
  //     .then(json => {
  //       // console.log(json);
  //       setLocation(json.results[7].formatted_address);

  //       var addressComponent = json.results[0].address_components[0];
  //       console.log(addressComponent);
  //     })
  //     .catch(error => console.warn(error));
  // }
  const from = route?.params?.from;
  return (
    <View style={styles.root}>
      {/* <Image
        style={styles.blob}
        source={require('../../assets/images/wave.png')}
      /> */}
      {/* <View style={[styles.searchBar, styles.locationBar]}>
        <FontIcon
          style={styles.searchBarIcon}
          name="location-arrow"
          size={20}
          color={colors.textcolor}
        />
        
        <View>
          <Text style={styles.locationBarText}>{location}</Text>
         
        </View>
      </View> */}
      {/* <View style={styles.searchBar}>
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
      </View> */}

      {/* <Text style={styles.title}>{`Browse (from ${from})`}</Text> */}
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          clusterColor={colors.maincolor}
          style={styles.map}
          ref={mapViewRef}
          mapType={'terrain'}
          region={region}
          clustering={true}
          // onPress={
          //   e => handleSelect(e.nativeEvent.coordinate)
          //   // console.log(e.nativeEvent.coordinate)
          // }
          // onRegionChangeComplete={region => setRegion(region)}
        >
          {initialData &&
            recipeData.map((marker, index) => (
              <Marker
                // pointerEvents="auto"
                key={index}
                style={{resizeMode: 'contain', alignItems: 'center'}}
                tracksViewChanges={false}
                icon={require('../../assets/images/recipeIcon.png')}
                onPress={e => console.log(e.nativeEvent)}
                coordinate={{
                  latitude: parseFloat(marker.recipe.latitude),
                  longitude: parseFloat(marker.recipe.longitude),
                }}>
                <Text style={styles.subtitle}>{marker.recipe.name}</Text>
                <Callout
                  tooltip={true}
                  style={styles.customView}
                  onPress={() => {
                    console.log(marker.id);
                    try {
                      AsyncStorage.setItem('id', marker.id);
                    } catch (error) {
                      // Error saving data
                      console.log(error);
                    }
                    const jumpToAction = TabActions.jumpTo('Recipe', {
                      id: marker.id,
                    });

                    navigation.dispatch(jumpToAction);
                  }}>
                  <MapCard
                    name={marker.recipe.name}
                    imgUrl={marker.recipe.image}
                    rating={[
                      marker.recipe.rating.rating,
                      marker.recipe.rating.amountOfRatings,
                    ]}
                    time={marker.recipe.time}
                    likes={marker.recipe.likes}
                    recipeId={marker.id}
                  />
                </Callout>
              </Marker>
            ))}
        </MapView>
      </View>
      <View style={styles.buttons}>
        {initialData && (
          <RandomButton mapViewRef={mapViewRef} recipeData={recipeData} />
        )}

        <LocationButton mapViewRef={mapViewRef} />
        {/* <TouchableHighlight
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
        </TouchableHighlight> */}
      </View>

      {/* {loading ? (
        <Text style={styles.title}>Pick a country</Text>
      ) : (
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
              rating={[
                item.recipe.rating.rating,
                item.recipe.rating.amountOfRatings,
              ]}
              time={item.recipe.time}
              likes={item.recipe.likes}
              recipeId={item.id}
            />
          )}
        />
      )} */}
    </View>
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
    // borderRadius: 10,
    overflow: 'hidden',
    // margin: 20,
    // marginTop: 50,
  },
  map: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 1,
  },

  markerImage: {
    width: 50,
    height: 50,
  },
  currentLocation: {
    color: colors.textcolor,
  },
  subtitle: {
    color: colors.textcolor,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 65,
  },

  randomButton: {
    backgroundColor: colors.secondarycolor,
  },
  shareButton: {
    backgroundColor: colors.triarycolor,
  },
  textcolor: {color: '#fff'},

  buttons: {
    // position: 'absolute',
    // bottom: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    // overflow:'hidden',
    // marginBottom: 10,
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
  //extra ccs
  //css voor foodcard
  foodcard: {
    width: 250,
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  bottemItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  vertical: {
    margin: 15,
    width: Dimensions.get('window').width * 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titel: {
    width: 180,
    color: colors.textcolor,
  },
  image: {
    width: 300,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  textcolor: {
    color: colors.textcolor,
  },
});
export default Browse;
