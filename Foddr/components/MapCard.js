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

const MapCard = ({
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
          console.log(recipeId);
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
      <View
        style={{
          borderRadius: 10,
          // height: 250,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            // height: 150,
            top: -50,
            // width: 270,
            height: 150,
            overflow: 'hidden',
            borderRadius: 10,
            // backgroundColor: '#fff',
            // zIndex: 10,
          }}>
          <Image
            style={{
              borderRadius: 10,
            }}
            source={{
              width: 270,
              height: 110,
              uri: imgUrl,
            }}
            resizeMode="cover"
          />
        </Text>

        <View style={styles.bottemItems}>
          <Rating rating={rating} />
          <Text numberOfLines={1} style={styles.titel}>
            {name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.textcolor}>{time}min </Text>
            <FontIcon name="clock" size={20} solid color={'#333333'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
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
    position: 'absolute',
    bottom: 5,
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
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
    // zIndex: 10,
  },
  textcolor: {
    color: colors.textcolor,
  },
};
export default MapCard;
