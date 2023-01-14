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
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import ModalInput from './ModalInput';
const auth = firebase.auth();
const RatingBar = ({rating, recipeID, parentRatingCallback}) => {
  const [rated, setRated] = useState(handleCheck());
  const [clicked, setClicked] = useState(false);

  function handleCheck() {
    if (typeof rating === 'array') {
      // value has the .find method
      return rating.find(item => item.uid === auth.currentUser.uid)?.score;
    } else {
      // value does not have the .find method
      //probly not an array because it hasnt been rated yet
      return 0;
    }
  }
  function submitRating(score) {
    let alreadyRated = false;
    if (score > 5) {
      score = 5;
    } else if (score < 0 || score == undefined) {
      score = 0;
    }
    firebase
      .firestore()
      .collection('recipes')
      .doc(recipeID)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var rating = doc.data().rating;
          if ('rating' in doc.data()) {
            console.log('Rating field exists');
            var rating = doc.data().rating;
            for (var i = 0; i < rating.length; i++) {
              if (rating[i].uid === auth.currentUser.uid) {
                rating[i].score = score;
                alreadyRated = true;
                break;
              }
            }
            if (!alreadyRated) {
              rating.push({uid: auth.currentUser.uid, score: score});
            }
          } else {
            console.log('Rating field does not exist, it will be created now');
            rating = [{uid: auth.currentUser.uid, score: score}];
          }
          firebase
            .firestore()
            .collection('recipes')
            .doc(recipeID)
            .set({rating}, {merge: true});
          console.log('Updated rating');
          setRated(score);
          setClicked(false);
          parentRatingCallback(rating);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
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
        <ModalInput
          score={rated}
          submitRating={submitRating}
          style={{
            position: 'absolute',
            top: 0,
            width: Dimensions.get('window').width,
            zIndex: 100,
            height: Dimensions.get('window').height,
          }}
        />
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
