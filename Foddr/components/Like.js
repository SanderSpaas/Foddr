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
import colors from '../theme/colors';
import {useNavigation} from '@react-navigation/native';

const auth = firebase.auth();
const {uid} = auth.currentUser;
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
      // console.log('=============================');
      // console.log(name + ' ' + likesArray + ' : ' + uid);
      // // console.log(likesArray.includes(uid));
      // console.log('undefined');
      // return handleCheck();
      return false;
    } else if (likesArray.lenght == 0) {
      // console.log('=============================');
      // console.log(name + ' ' + likesArray + ' : ' + uid);
      // console.log(likesArray.includes(uid));
      return false;
    } else {
      // console.log('=============================');
      // console.log(name + ' ' + likesArray + ' : ' + uid);
      // console.log(likesArray.includes(uid));
      return likesArray.includes(uid);
    }
  }
  function addToLiked(recipeID) {
    //user id toevoegen aan recept dat geliked is
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid),
      });
    console.log('Updated likes');
    setLiked(handleCheck(likesArray.push(uid)));
  }
  function removeFromLiked(recipeID) {
    //removing user id from liked array in recipe
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .update({likes: firebase.firestore.FieldValue.arrayRemove(uid)});
    console.log('removed like');

    setLiked(handleCheck(likesArray.pop()));
  }

  // console.log(likes);
  return (
    <>
      {liked ? (
        <TouchableHighlight
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
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          onPress={() => {
            addToLiked(recipeId);
          }}
          style={styles.touch}>
          <>
            <FontIcon
              style={styles.like}
              name="heart"
              size={20}
              solid
              // color={'#333333'}
            />
            <View style={styles.likeBackdrop}></View>
          </>
        </TouchableHighlight>
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
    // backgroundColor: '#000',
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
    // padding: 20,
    zIndex: 3,
    color: '#fff',
    opacity: 0.4,
    // width: 5,
    // height: 50,
  },
  liked: {
    color: colors.quatrarycolor,
    opacity: 1,
  },
  textcolor: {
    color: colors.textcolor,
  },
};
export default Like;
