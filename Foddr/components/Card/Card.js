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
import {colors} from '../../theme/colors';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
// import {images} from '../../theme/images';

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
    borderColor: '#64578A',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    padding: 3,
    marginLeft: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 65,
    color: '#64578A',
    position: 'absolute',
    left: 0,
    bottom: 40,
  },
  titel: {
    width: 100,
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
};

const Card = ({recipeName, imgUrl, onPress, rating, time, liked}) => {
  return (
    //  {/* //food card */}
    <TouchableHighlight
      onPress={() => {
        onPress;
      }}
      style={styles.foodcard}>
      <View>
        <Image style={styles.image} source={imgUrl} />

        <TouchableHighlight onPress={() => {}} style={styles.likeBackdrop}>
          <FontIcon
            style={styles.like}
            name="heart"
            size={20}
            solid
            color={'#333333'}
          />
        </TouchableHighlight>

        <View style={styles.rating}>
          <FontIcon name="star" size={15} solid color={'#64578A'} />
          <Text>{rating}</Text>
        </View>
        <View style={styles.bottemItems}>
          <Text numberOfLines={1} style={styles.titel}>
            {recipeName}
          </Text>
          <View style={styles.row}>
            <Text>{time}min </Text>
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
  imgUrl: '../../assets/images/grill.png',
  onPress: () => {},
  rating: '4.0',
  time: 20,
  liked: false,
};

export default Card;
