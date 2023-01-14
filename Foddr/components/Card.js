import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import Like from './Like';
import Rating from './Rating';

const Card = ({recipe, recipeId, vertical, sidebar}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        {
          console.log('recipeId in card', recipeId);
          navigation.navigate('Recipe', {recipeId: recipeId});
        }
      }}
      style={[
        styles.foodcard,
        vertical ? styles.vertical : sidebar ? styles.sidebar : styles.foodcard,
      ]}>
      <View>
        <Image
          style={[
            styles.image,
            vertical
              ? styles.verticalImg
              : sidebar
              ? styles.sidebarImg
              : styles.image,
          ]}
          source={{uri: recipe.image}}
        />
        <View style={styles.likeContainer}>
          <Like likes={recipe.likes} recipeId={recipeId} />
        </View>

        <Rating rating={recipe.rating} />
        <View
          style={[
            styles.bottemItems,
            vertical ? styles.bottemItems : styles.sidebarBottemItems,
          ]}>
          <Text numberOfLines={1} style={styles.titel}>
            {recipe.name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.textcolor}>{recipe.time} min </Text>
            <FontIcon name="clock" size={20} solid color={'#333333'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    height: 180,
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
  },
  bottemItems: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  vertical: {
    margin: 10,
    width: Dimensions.get('window').width * 0.85,
  },
  verticalImg: {
    margin: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  sidebar: {
    // margin: 10,
    height: 205,
    width: Dimensions.get('window').width * 0.7,
  },
  sidebarImg: {
    // margin: 10,
    height: 150,
    width: Dimensions.get('window').width * 0.65,
  },
  sidebarBottemItems: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titel: {
    width: 180,
    color: colors.textcolor,
    // fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 290,
    // flex: 2,
    alignSelf: 'center',
    height: 125,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    // zIndex: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textcolor: {
    color: colors.textcolor,
    fontWeight: 'bold',
  },
};
export default Card;
