import {firebase} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../theme/globalStyles';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import ModalInput from './ModalInput';
const auth = firebase.auth();
const RatingBar = ({rating, recipeID}) => {
  // console.log('rating', rating);
  // console.log('recipeID', recipeID);
  let ratingArray;
  const [rated, setRated] = useState(handleCheck());
  const [clicked, setClicked] = useState(false);
  if (rating !== undefined && rating.length > 0) {
    ratingArray = rating;
    // console.log('rating', ratingArray);
  }
  function handleCheck() {
    console.log('ratingArray in handlecheck', rating);
    if (rating == undefined) {
      return 0;
    } else if (rating.lenght == 0) {
      return 0;
    } else {
      return rating.find(item => item.uid === auth.currentUser.uid)?.score;
    }
  }
  function submitRating(score) {
    //user id toevoegen aan recept dat geliked is
    console.log('recipeID in submit', recipeID);
    console.log('score', score);
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var scores = doc.data().scores[0];
          for (var i = 0; i < scores.length; i++) {
            if (scores[i].uid === auth.currentUser.uid) {
              scores[i].score = Number.parseInt(score);
              break;
            }
          }
          docRef.set({scores}, {merge: true});
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    console.log('Updated rating');
    setRated(score);
    setClicked(false);
  }
  // function removeFromRated(recipeID) {
  //   //removing user id from liked array in recipe
  //   firebase
  //     .firestore()
  //     .collection('recipes')
  //     .doc(recipeID)
  //     .update({
  //       likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
  //     });
  //   console.log('removed like');

  //   setLiked(handleCheck(likesArray.pop()));
  // }
  return (
    <>
      {clicked && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 5,
          }}>
          <ModalInput score={rated} submitRating={submitRating} />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // position: 'absolute',
          // bottom: 0,
          height: 200,
          width: '100%',
        }}>
        <View
          style={{
            position: 'absolute',
          }}>
          <Image
            style={[
              globalStyles.blob,
              {
                height: 200,
              },
            ]}
            source={require('../assets/images/waveMirror.png')}
          />
        </View>

        <TouchableOpacity
          onPress={() => setClicked(true)}
          style={[styles.titleBar]}>
          <View>
            <Text style={[styles.barText]}>
              Leave a rating
              <FontIcon
                name="star"
                size={20}
                solid
                color={colors.secondarycolor}
              />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  titleBar: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  barText: {
    color: colors.textcolor,
    fontWeight: 'bold',
    alignItems: 'baseline',
  },
});
export default RatingBar;
