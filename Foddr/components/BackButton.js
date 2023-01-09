import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import globalStyles from '../theme/globalStyles';
export default BackButton => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={globalStyles.touch}
        onPress={() => {
          navigation.goBack();
        }}>
        <>
          <View style={globalStyles.circleBackdrop}></View>
          <FontIcon
            style={globalStyles.toucIcon}
            name="arrow-left"
            size={20}
            solid
            color={'white'}
          />
        </>
      </TouchableOpacity>
    </>
  );
};
