import React, {cloneElement, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  CommonActions,
  TabActions,
} from '@react-navigation/native';
import Like from './Like';
import Rating from './Rating';

const auth = firebase.auth();
const {uid} = auth.currentUser;

const Card = ({recipe, recipeId, vertical}) => {
  const navigation = useNavigation();
  // console.log('I am: ' + {name}.name + ' with id: ' + {recipeId}.recipeId);
  return (
    <TouchableOpacity
      onPress={() => {
        {
          try {
            AsyncStorage.setItem('id', recipeId);
            AsyncStorage.setItem('recipe', JSON.stringify(recipe));
          } catch (error) {
            // Error saving data
            console.log(error);
          }
          const jumpToAction = TabActions.jumpTo('Recipe', {id: recipeId});

          navigation.dispatch(jumpToAction);
          //passing parameters doesnt work due to a bug in the navigation library thats why we end up with this stupid solution
        }
      }}
      style={styles.foodcard}
      style={[styles.foodcard, vertical ? styles.vertical : styles.horizontal]}>
      <View>
        <Image style={styles.image} source={{uri: recipe.image}} />
        <Like likes={recipe.likes} recipeId={recipeId} />
        <Rating
          rating={[recipe.rating.rating, recipe.rating.amountOfRatings]}
        />
        <View style={styles.bottemItems}>
          <Text numberOfLines={1} style={styles.titel}>
            {recipe.name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.textcolor}>{recipe.time} min </Text>
            <FontIcon name="clock" size={20} solid color={'#333333'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Card.defaultProps = {
  recipeName: 'DEFAULT - Fried chicken',
  // imgUrl: require('../../assets/images/grill.png'),
  onPress: () => {},
  rating: '4.0',
  time: 20,
  liked: false,
  recipeId: 1,
};
const styles = {
  //css voor foodcard
  foodcard: {
    width: 250,
    height: 180,
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
  },
  bottemItems: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //center the items vertically
    // justifyContent: 'center',
    height: 45,
    // backgroundColor: colors.pink,
    padding: 5,
    // paddingTop: 15,
  },
  vertical: {
    margin: 10,
    width: Dimensions.get('window').width * 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titel: {
    width: 180,
    color: colors.textcolor,
    // fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 290,
    // flex: 2,
    alignSelf: 'center',
    height: 125,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    // zIndex: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textcolor: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
};
export default Card;
