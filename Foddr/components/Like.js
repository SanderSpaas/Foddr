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
import {useNavigation} from '@react-navigation/native';

const auth = firebase.auth();
let likesArray;

const Like = ({likes, recipeId}) => {
  if (likes !== undefined) {
    likesArray = likes;
    // console.log(recipeId);
  }
  const [liked, setLiked] = useState(handleCheck());
  const navigation = useNavigation();

  function handleCheck() {
    if (likesArray == undefined) {
      return false;
    } else if (likesArray.lenght == 0) {
      return false;
    } else {
      return likesArray.includes(auth.currentUser.uid);
    }
  }
  function addToLiked(recipeID) {
    //user id toevoegen aan recept dat geliked is
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      });
    console.log('Updated likes');
    setLiked(handleCheck(likesArray.push(auth.currentUser.uid)));
  }
  function removeFromLiked(recipeID) {
    //removing user id from liked array in recipe
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
      });
    console.log('removed like');

    setLiked(handleCheck(likesArray.pop()));
  }
  return (
    <>
      {liked ? (
        <TouchableOpacity
          onPress={() => {
            removeFromLiked(recipeId);
          }}
          style={styles.touch}>
          <>
            <FontIcon
              style={[styles.like, styles.liked]}
              name="heart"
              size={20}
              solid
              // color={'#e06c75'}
            />
            <View style={styles.likeBackdrop}></View>
          </>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            addToLiked(recipeId);
          }}
          style={styles.touch}>
          <>
            <FontIcon style={styles.like} name="heart" size={20} solid />
            <View style={styles.likeBackdrop}></View>
          </>
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = {
  touch: {
    position: 'absolute',
    zIndex: 5,
    width: 50,
    height: 50,
    top: 9,
    right: 7,
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
    zIndex: 3,
    color: '#fff',
    opacity: 0.4,
  },
  liked: {
    color: colors.quatrarycolor,
    opacity: 1,
  },
};
export default Like;
