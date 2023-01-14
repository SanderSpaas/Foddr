import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import Rating from './Rating';

const auth = firebase.auth();

const MapCard = ({name, imgUrl, rating, time, vertical}) => {
  const navigation = useNavigation();
  // console.log('I am: ' + {name}.name);
  return (
    <TouchableOpacity
      style={[
        styles.foodcard,
        vertical ? styles.vertical : styles.horizontal,
        globalStyles.shadow,
      ]}>
      <View
        style={{
          borderRadius: 10,
          // height: 250,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            // height: 150,
            top: Platform.OS === 'ios' ? 0 : -50,
            // width: 270,
            height: 150,
            overflow: 'hidden',
            borderRadius: 10,
            // backgroundColor: '#fff',
            // zIndex: 10,
          }}>
          <Image
            style={{
              borderRadius: 10,
            }}
            source={{
              width: 270,
              height: 110,
              uri: imgUrl,
            }}
            resizeMode="cover"
          />
        </Text>

        <View style={styles.bottemItems}>
          <View style={styles.ratingContainer}>
            <Rating rating={rating} />
          </View>

          <Text numberOfLines={1} style={styles.titel}>
            {name}
          </Text>
          <View style={styles.row}>
            <Text style={{color: colors.textcolor}}>{time}min </Text>
            <FontIcon name="clock" size={20} solid color={'#333333'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  //css voor foodcard
  foodcard: {
    width: 250,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  bottemItems: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 5,
  },
  vertical: {
    margin: 15,
    width: Dimensions.get('window').width * 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titel: {
    width: 180,
    color: colors.textcolor,
  },
  image: {
    // width: 300,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
    // zIndex: 10,
  },
  // textcolor: {
  //   color: colors.textcolor,
  // },
  ratingContainer: {
    position: 'absolute',
    bottom: 50,
    left: -5,
  },
};
export default MapCard;
