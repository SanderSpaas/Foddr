import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import LikeElasticButton from './LikeElasticButtonExtended';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
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
      console.log('likesArray is undefined');
      return false;
    } else if (likesArray.lenght == 0) {
      console.log('likesArray is empty');
      return false;
    } else {
      // console.log('likesArray is not empty');
      return likesArray.includes(auth.currentUser.uid);
    }
  }
  function addToLiked(recipeID) {
    //user id toevoegen aan recept dat geliked is
    console.log('recipeID in addtoliekd', recipeID);
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
  function checkLiked() {
    setTimeout(() => {
      console.log('timeout completed for playing animation');
      if (liked) {
        removeFromLiked(recipeId);
        console.log('liked', liked);
      } else {
        addToLiked(recipeId);
        console.log('liked', liked);
      }
    }, 150);
  }
  return (
    <View
      style={
        {
          // justifyContent: 'center',
          // alignItems: 'center',
        }
      }>
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          borderRadius: 50,
          backgroundColor: '#000',
          opacity: 0.4,
          padding: 20,
          zValue: 0, //Android
          zIndex: 0, //iOS
          margin: 5,
        }}></View>
      <View style={{
        position: 'absolute',
        right: -2,
        top: -1,

      }}>
        
        <LikeElasticButton
          style={{
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 50,
          }}
          onPress={() => checkLiked()}
          active={liked}
          initialColor={'white'}
          height={25}
          width={25}
          endColor={colors.quatrarycolor}
        />
      </View>
    </View>
  );
};
export default Like;
