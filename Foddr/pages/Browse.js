import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Callout, Marker} from 'react-native-maps';
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
import { observer, inject } from 'mobx-react';

// @inject('store')
// @observer
const Browse = ({route, navigation}) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataRender, setRecipeDataRender] = useState([]);
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
    // const { store } = this.props;
    
  const mapViewRef = useRef(MapView);
  useEffect(() => {
    const ref = firebase.firestore().collection('recipes');
    const subscriber = ref.onSnapshot(snapshot => {
      let recipesArray = [];
      snapshot.forEach(doc => {
        recipesArray.push({
          id: doc.id,
          recipe: doc.data(),
        });
      });
      setRecipeData(recipesArray);
      //filter recipes based on seasons selected
      recipesArray = recipesArray.filter(recipeData =>
        showRecipe(recipeData.recipe.seasons),
      );
      setRecipeDataRender(recipesArray);
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  function updateSeason(season, value) {
    let ingredientsObj = seasons;
    ingredientsObj[season] = value;
    setSeasons(ingredientsObj);
    // console.log('seasons', seasons);
    filteredRecipes = recipeData.filter(recipeData =>
      showRecipe(recipeData.recipe.seasons),
    );
    setRecipeDataRender(filteredRecipes);
  }

  function showRecipe(recipeSeasons) {
    //checks if the recipe has any of the selected seasons and returns true if it does
    let show = false;
    Object.entries(recipeSeasons).forEach(recipeSeason => {
      const [key, value] = recipeSeason;
      if (recipeSeason[1] && seasons[key]) {
        show = recipeSeason[1];
      }
    });
    return show;
  }

  return (
    <View style={styles.root}>
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
          {recipeDataRender.map((marker, index) => (
            <Marker
              key={index}
              style={{
                resizeMode: 'contain',
              }}
              calloutOffset={{x: -100, y: 65}}
              tracksViewChanges={false}
              icon={require('../assets/images/recipeIcon.png')}
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
                  navigation.navigate('Recipe', {recipeId: marker.id});
                }}>
                <MapCard
                  name={marker.recipe.name}
                  imgUrl={marker.recipe.image}
                  rating={marker.recipe.rating}
                  time={marker.recipe.time}
                />
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={styles.buttons}>
        {recipeDataRender !== undefined && recipeDataRender !== null && (
          <RandomButton mapViewRef={mapViewRef} recipeData={recipeDataRender} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
