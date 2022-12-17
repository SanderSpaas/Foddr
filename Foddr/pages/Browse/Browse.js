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
import SeasonButton from '../../components/SeasonButton.js';
const auth = firebase.auth();
const db = firebase.firestore();
const fallImg = '../../assets/images/fallIcon.png';
const winterImg = '../../assets/images/winterIcon.png';
const springImg = '../../assets/images/springIcon.png';
const summerImg = '../../assets/images/summerIcon.png';

const Browse = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataRender, setRecipeDataRender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: 51.186533128908827,
    longitude: 1.52344711124897,
    latitudeDelta: 30.59454374963337,
    longitudeDelta: 1.682658165693283,
  });
  const [marker, setMarker] = useState({
    latitude: 16,
    longitude: 1,
  });
  const [seasons, setSeasons] = useState({
    fall: true,
    spring: true,
    summer: true,
    winter: true,
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
  useEffect(() => {
    const ref = firebase.firestore().collection('recipes');
    // setLoading(true);
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
      // setRecipeDataRender(recipesArray);
      filterRecipes();
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  function talkToParent(data) {
    // setLoading(true);
    // console.log('loading bij klikken seiszoen', loading);
    // console.log(data); // LOGS DATA FROM CHILD
    if (data[0] === fallImg) {
      updateSeason('fall', data[1]);
      // console.log('loading', loading);
      // setLoading(!loading);
      // console.log('loading', loading);
    } else if (data[0] === winterImg) {
      updateSeason('winter', data[1]);
    } else if (data[0] === springImg) {
      updateSeason('spring', data[1]);
    } else if (data[0] === summerImg) {
      updateSeason('summer', data[1]);
    } else {
      console.log('something went wrong with that season mate');
    }
    filterRecipes();
  }
  function updateSeason(season, value) {
    let ingredientsObj = seasons;
    ingredientsObj[season] = value;
    setSeasons(ingredientsObj);
    console.log('seasons', seasons);
  }
  function filterRecipes() {
    let filteredRecipes = recipeData.filter(recipeData =>
      showRecipe(recipeData.recipe.seasons),
    );
    // console.log('=====================');
    // filteredRecipes.forEach(item => console.log(item.recipe.name));
    setRecipeDataRender(filteredRecipes);
    console.log('recipeDataRender', ' has been set');
    // setLoading(false);
    // setInitialData(true);
    // console.log('initialData', initialData);
  }
  function showRecipe(recipeSeasons) {
    let show = false;
    Object.entries(recipeSeasons).forEach(recipeSeason => {
      const [key, value] = recipeSeason;
      if (recipeSeason[1] && seasons[key]) {
        show = recipeSeason[1];
      }
    });
    return show;
  }

  const from = route?.params?.from;
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>de loading state: {loading}</Text> */}
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          clusterColor={colors.maincolor}
          style={styles.map}
          ref={mapViewRef}
          mapType={'terrain'}
          region={region}
          clustering={true}>
          {recipeDataRender &&
            recipeDataRender.map((marker, index) => (
              <Marker
                key={index}
                style={{resizeMode: 'contain', alignItems: 'center'}}
                tracksViewChanges={!recipeDataRender}
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
        {recipeDataRender !== undefined && ( //TODO dont render this if no recipes are available
          <RandomButton mapViewRef={mapViewRef} recipeData={recipeDataRender} />
        )}
        <View style={styles.seasonButtons}>
          <SeasonButton
            imgUrl={require(fallImg)}
            color={'#f8312f'}
            colorBackground={'#ffa289'}
            talkToParent={talkToParent}
            enabled={seasons.fall}
            id={fallImg}
            X
          />
          <SeasonButton
            imgUrl={require(winterImg)}
            color={'#0084ce'}
            colorBackground={'#6595cb'}
            talkToParent={talkToParent}
            enabled={seasons.winter}
            id={winterImg}
          />
          <SeasonButton
            imgUrl={require(springImg)}
            color={'#ff6cc8'}
            colorBackground={'#ffb9d6'}
            talkToParent={talkToParent}
            enabled={seasons.spring}
            id={springImg}
          />
          <SeasonButton
            imgUrl={require(summerImg)}
            color={'#ff822d'}
            colorBackground={'#f5de7e'}
            talkToParent={talkToParent}
            enabled={seasons.summer}
            id={summerImg}
          />
        </View>

        <LocationButton mapViewRef={mapViewRef} />
      </View>
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
    fontSize: 20,
    color: colors.textcolor,
    padding: 10,
    backgroundColor: colors.pink,
    zIndex: 20,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.5,
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
  seasonButtons: {
    position: 'absolute',
    right: -20,
    bottom: Dimensions.get('window').height * 0.3,
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
