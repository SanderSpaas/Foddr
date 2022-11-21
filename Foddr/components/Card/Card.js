import React from 'react';
// import PropTypes from 'prop-types';
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

const auth = firebase.auth();
const db = firebase.firestore();

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
    left: 0,
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
    width: 250,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
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
    right: 0,
    top: 0,
    padding: 10,
    // opacity: 10,
    zIndex: 3,
    color: '#fff',
  },
  textcolor: {
    color: colors.textcolor,
  },
};
function addToLiked(id, image) {
  // console.log('handeling liked with id: ' + id);
  const {uid} = auth.currentUser;

  const ref = db.collection('users').doc(uid);
  //nieuw item in userLikes gaan aanmaken met als titel een random id
  // firestore()
  //   .collection('userLikes')
  //   .add({
  //     //TODO ALS DE DATA VAN HET RECEPT VERANDEREN DEZE OOK UPDATEN
  //     recipeName: 'Ada Lovelace',
  //     uid: uid,
  //     image: image,

  //   })
  //   .then(() => {
  //     console.log('User added!');
  //   });
  ref.update({
    likes: firebase.firestore.FieldValue.arrayUnion(id),
  });
}

const Card = ({name, imgUrl, onPress, rating, time, liked, recipeId, id}) => {
  const navigation = useNavigation();
  // console.log(likes);
  return (
    //  {/* //food card */}
    <TouchableHighlight
      onPress={() => {
        {
          navigation.navigate('Recipe', {
            id: id,
          });
        }
      }}
      style={styles.foodcard}>
      <View>
        {/* <Text>{imgUrl}</Text> */}
        <Image style={styles.image} source={{uri: imgUrl}} />
        {/* {liked !== false ? (
          <TouchableHighlight
            onPress={() => {
              addToLiked(recipeId);
            }}
            style={styles.likeBackdrop}>
            <FontIcon
              style={styles.like}
              name="heart"
              size={20}
              solid
              color={'#333333'}
            />
          </TouchableHighlight>
        ) : ( */}
        <TouchableHighlight
          onPress={() => {
            removeFromLiked(recipeId);
          }}
          style={styles.likeBackdrop}>
          <FontIcon
            style={styles.like}
            name="heart"
            size={20}
            solid
            color={'#e06c75'}
          />
        </TouchableHighlight>
        {/* )} */}

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

// Card.propTypes = {
//   recipeName: PropTypes.string,
//   imgUrl: PropTypes.string,
//   onPress: PropTypes.func,
//   rating: PropTypes.string,
//   time: PropTypes.number,
//   liked: PropTypes.bool,
// };

Card.defaultProps = {
  recipeName: 'DEFAULT - Fried chicken',
  // imgUrl: require('../../assets/images/grill.png'),
  onPress: () => {},
  rating: '4.0',
  time: 20,
  liked: false,
  recipeId: 1,
};

export default Card;
