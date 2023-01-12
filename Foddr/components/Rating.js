import {firebase} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
const auth = firebase.auth();

let finalScore = 0;
const Rating = ({rating}) => {
  const [finalScore, setFinalScore] = useState(handleCheck());
  function handleCheck() {
    if (rating !== undefined && rating.length > 0) {
      console.log('rating in ratingblokje zelf', rating);
      const filteredScores = rating[0].filter(item =>
        item.hasOwnProperty('score'),
      );
      const scoreValues = filteredScores.map(item => item.score);
      console.log('scoreValues', scoreValues);
      return scoreValues.reduce((acc, score) => acc + score, 0);
    }
  }

  return (
    <View style={styles.rating}>
      <FontIcon name="star" size={15} solid color={colors.secondarycolor} />
      <Text style={styles.ratingText}>{finalScore.toFixed(1)}</Text>
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
