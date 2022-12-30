import React from 'react';
import {
  Text,
  View
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';

const Rating = ({rating}) => {
  return (
    <View style={styles.rating}>
      <FontIcon name="star" size={15} solid color={colors.secondarycolor} />
      <Text style={styles.ratingText}>
        {rating[0] === 0 ? 0 : (rating[0] / rating[1]).toFixed(1)}
      </Text>
    </View>
  );
};
const styles = {
  rating: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 3,
    marginLeft: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 65,
    color: colors.secondarycolor,
    borderRadius: 5,
    bottom: 40,
  },
  ratingText: {
    color: colors.textcolor,
  },
};
export default Rating;
