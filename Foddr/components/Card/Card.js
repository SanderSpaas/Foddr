import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import Like from '../Like';

const auth = firebase.auth();
const {uid} = auth.currentUser;
// let likesArray;
let counter = 0;
// const db = firebase.firestore();

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

  return (
    <TouchableHighlight
      onPress={() => {
        {
          navigation.navigate('Recipe', {
            id: recipeId,
          });
        }
      }}
      style={styles.foodcard}
      style={[styles.foodcard, vertical ? styles.vertical : styles.horizontal]}>
      <View>
        {/* <Text>{imgUrl}</Text> */}
        <Image style={styles.image} source={{uri: imgUrl}} />
        <Like likes={likes} recipeId={recipeId} />
        <View style={styles.rating}>
          <FontIcon name="star" size={15} solid color={'#64578A'} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.bottemItems}>
          <Text numberOfLines={1} style={styles.titel}>
            {name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.textcolor}>{time}min </Text>
            <FontIcon name="clock" size={20} solid color={'#333333'} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
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
    marginTop: 20,
    width: Dimensions.get('window').width * 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    borderColor: colors.secondarycolor,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    padding: 3,
    marginLeft: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 65,
    color: colors.secondarycolor,
    position: 'absolute',
    // left: 0,
    bottom: 40,
  },
  ratingText: {
    color: colors.textcolor,
  },
  titel: {
    width: 180,
    color: colors.textcolor,
  },
  image: {
    // width: 250,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  touch: {
    position: 'absolute',
    zIndex: 5,
    width: 50,
    height: 50,
    // backgroundColor: '#000',
    top: 0,
    right: 0,
    borderRadius: 50,
  },
  likeBackdrop: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 20,
    backgroundColor: '#000',
    opacity: 0.4,
    zIndex: 2,
    borderRadius: 50,
    margin: 5,
  },
  like: {
    position: 'absolute',
    right: 15,
    top: 15,
    // padding: 20,
    zIndex: 3,
    color: '#fff',
    opacity: 0.4,
    // width: 5,
    // height: 50,
  },
  liked: {
    color: colors.pink,
    opacity: 1,
  },
  textcolor: {
    color: colors.textcolor,
  },
};
export default Card;
