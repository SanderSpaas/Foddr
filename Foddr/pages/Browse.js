import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {TabActions} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Callout, Marker} from 'react-native-maps';
import Loader from '../components/Loader.js';
import LocationButton from '../components/LocationButton.js';
import MapCard from '../components/MapCard.js';
import RandomButton from '../components/RandomButton.js';
import SeasonButton from '../components/SeasonButton.js';
import colors from '../theme/colors.js';
import globalStyles from '../theme/globalStyles.js';
const auth = firebase.auth();
const db = firebase.firestore();
const fallImg = '../assets/images/fallIcon.png';
const winterImg = '../assets/images/winterIcon.png';
const springImg = '../assets/images/springIcon.png';
const summerImg = '../assets/images/summerIcon.png';

const Browse = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataRender, setRecipeDataRender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);
  const [region, setRegion] = useState({
    latitude: 51.186533128908827,
    longitude: 1.52344711124897,
    latitudeDelta: 30.59454374963337,
    longitudeDelta: 1.682658165693283,
  });
  const [seasons, setSeasons] = useState({
    fall: true,
    spring: true,
    summer: true,
    winter: true,
  });

  const mapViewRef = useRef(MapView);
  const markerRef = useRef(Marker);

  useEffect(() => {
    const ref = firebase.firestore().collection('recipes');
    const subscriber = ref.onSnapshot(snapshot => {
      setLoading(true);
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
      filterRecipes();
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  function updateSeason(season, value) {
    let ingredientsObj = seasons;
    ingredientsObj[season] = value;
    setSeasons(ingredientsObj);
    console.log('seasons', seasons);
    filterRecipes();
  }
  function filterRecipes() {
    let filteredRecipes = recipeData.filter(recipeData =>
      showRecipe(recipeData.recipe.seasons),
    );
    // console.log('=====================');
    // filteredRecipes.forEach(item => console.log(item.recipe.name));

    setRecipeDataRender(filteredRecipes);
    console.log('recipeDataRender', ' has been set');
    setLoading(false);
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
      <Loader loading={loading} />
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          clusterColor={colors.maincolor}
          style={globalStyles.map}
          ref={mapViewRef}
          mapType={'terrain'}
          region={region}
          clustering={true}
          toolbarEnabled={false}>
          {!loading &&
            recipeDataRender.map((marker, index) => (
              <Marker
                key={index}
                style={{
                  resizeMode: 'contain',
                }}
                useRef={markerRef}
                identifier={marker.id}
                tracksViewChanges={!images}
                icon={require('../assets/images/recipeIcon.png')}
                onPress={e => console.log(e.nativeEvent)}
                coordinate={{
                  latitude: parseFloat(marker.recipe.latitude),
                  longitude: parseFloat(marker.recipe.longitude),
                }}>
                <Text style={[styles.subtitle, {textAlign: 'center'}]}>
                  {marker.recipe.name}
                </Text>
                <Callout
                  tooltip={true}
                  onPress={() => {
                    console.log(marker.id);
                    try {
                      AsyncStorage.setItem('id', marker.id);
                      AsyncStorage.setItem(
                        'recipe',
                        JSON.stringify(marker.recipe),
                      );
                    } catch (error) {
                      // Error saving data
                      console.log(error);
                    }
                    const jumpToAction = TabActions.jumpTo('Recipe', {
                      id: marker.id,
                      recipe: marker.recipe,
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
        {recipeDataRender !== undefined &&
          recipeDataRender !== null && ( //TODO dont render this if no recipes are available
            <RandomButton
              mapViewRef={mapViewRef}
              recipeData={recipeDataRender}
            />
          )}
        <View style={styles.seasonButtons}>
          <SeasonButton
            imgUrl={require(fallImg)}
            color={'#f8312f'}
            colorBackground={'#ffa289'}
            talkToParent={updateSeason}
            enabled={seasons.fall}
            id={'fall'}
          />
          <SeasonButton
            imgUrl={require(winterImg)}
            color={'#0084ce'}
            colorBackground={'#6595cb'}
            talkToParent={updateSeason}
            enabled={seasons.winter}
            id={'winter'}
          />
          <SeasonButton
            imgUrl={require(springImg)}
            color={'#ff6cc8'}
            colorBackground={'#ffb9d6'}
            talkToParent={updateSeason}
            enabled={seasons.spring}
            id={'spring'}
          />
          <SeasonButton
            imgUrl={require(summerImg)}
            color={'#ff822d'}
            colorBackground={'#f5de7e'}
            talkToParent={updateSeason}
            enabled={seasons.summer}
            id={'summer'}
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
});
export default Browse;
