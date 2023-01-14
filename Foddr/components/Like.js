import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
const auth = firebase.auth();
let likesArray;

const Like = ({ likes, recipeId }) => {
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
  return (
    <View style={{ flex: 1 }}>
      {liked ? (
        <TouchableOpacity
          onPress={() => {
            removeFromLiked(recipeId);
          }}
          style={globalStyles.touch}>
          <>
            <FontIcon
              style={[globalStyles.touchIcon, styles.liked]}
              name="heart"
              size={20}
              solid
            // color={'#e06c75'}
            />
            <View style={globalStyles.circleBackdrop}></View>
          </>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={globalStyles.touch}
          onPress={() => {
            addToLiked(recipeId);
          }}>
          <>
            <FontIcon
              style={[globalStyles.touchIcon, { opacity: 0.5 }]}
              name="heart"
              size={20}
              solid
            />
            <View style={globalStyles.circleBackdrop}></View>
          </>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = {
  liked: {
    color: colors.quatrarycolor,
    opacity: 1,
  },
};
export default Like;
