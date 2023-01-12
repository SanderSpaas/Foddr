import {firebase} from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
const auth = firebase.auth();

let scoreValues = [];
const Rating = ({rating}) => {
  const [finalScore, setFinalScore] = useState();
  useEffect(
    React.useCallback(() => {
      handleCheck();
    }, []),
  );
  function handleCheck() {
    console.log('rating.length', rating.length);
    console.log('rating', rating);
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
      console.log('score', score);
      setFinalScore(score);
      console.log('finalScore', finalScore);
    } else {
      console.log('no rating');
      setFinalScore(0);
    }
  }

  return (
    <View style={styles.rating}>
      <FontIcon name="star" size={20} solid color={colors.secondarycolor} />
      <Text style={styles.ratingText}>
        {Number.parseInt(finalScore).toFixed(2) / scoreValues.length}
      </Text>
      <Text style={styles.ratingText}>{finalScore}</Text>
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
