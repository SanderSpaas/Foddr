import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
const auth = firebase.auth();
// let checkedRating = [];
let scoreValues = [];
const Rating = ({rating}) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    handleCheck();
  }, [rating]);
  function handleCheck() {
    if (rating !== undefined && rating.length > 0) {
      console.log('rating in ratingblokje zelf', rating);
      const filteredScores = rating.filter(item =>
        item.hasOwnProperty('score'),
      );
      scoreValues = filteredScores.map(item => item.score);
      console.log('scoreValues', scoreValues);
      let score = scoreValues.reduce(
        (acc, score) => Number.parseInt(acc) + Number.parseInt(score),
        0,
      );
      score = score / scoreValues.length;
      setScore(score);
      console.log('score', score);
    } else {
      console.log('no rating');
      console.log('rating', rating);
      setScore(0);
    }
  }

  return (
    <View style={styles.rating}>
      <FontIcon name="star" size={20} solid color={colors.secondarycolor} />
      <Text style={styles.ratingText}>
        {score === 0 ? 0.0 : Number.parseInt(score).toFixed(2)}
        {/* {score} */}
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
