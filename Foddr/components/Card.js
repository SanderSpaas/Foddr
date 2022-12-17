import React, {useState} from 'react';
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

const Card = ({
  name,
  imgUrl,
  onPress,
  rating,
  time,
  likes,
  recipeId,
  vertical,
}) => {
  if (likes !== undefined) {
    likesArray = likes;
  }
  const navigation = useNavigation();
  // console.log('I am: ' + {name}.name + ' with id: ' + {recipeId}.recipeId);
  return (
    <TouchableOpacity
      onPress={() => {
        {
          // console.log(recipeId);
          // console.log(navigation)
          // navigation.push('Recipe', {
          //   params: {id: recipeId},
          //   // merge: true,
          // });
          // navigation.dispatch({
          //   ...CommonActions.setParams({id: recipeId}),
          //   source: route.key,
          // });
          try {
            AsyncStorage.setItem('id', recipeId);
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
        <Image style={styles.image} source={{uri: imgUrl}} />
        <Like likes={likes} recipeId={recipeId} />
        <Rating rating={rating} />
        <View style={styles.bottemItems}>
          <Text numberOfLines={1} style={styles.titel}>
            {name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.textcolor}>{time} min </Text>
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
    height: 170,
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
    // width: 300,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#fff',
    // zIndex: 10,
  },
  textcolor: {
    color: colors.textcolor,
  },
};
export default Card;
