import React from 'react';
import {
  Dimensions,
  TouchableOpacity
} from 'react-native';
import GetLocation from 'react-native-get-location';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';

const LocationButton = ({mapViewRef}) => {
  function goToUserLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        let regionObj = {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          latitudeDelta: 0.11522,
          longitudeDelta: 0.11522,
        };
        console.log(mapViewRef);
        mapViewRef.current?.animateToRegion(regionObj, 2000);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  return (
    <TouchableOpacity
      onPress={() => {
        goToUserLocation();
      }}
      style={styles.buttonLocation}>
      <FontIcon
        style={styles.userLocation}
        name="crosshairs"
        size={30}
        solid
        color={colors.textcolor}
      />
    </TouchableOpacity>
  );
};
const styles = {
  buttonLocation: {
    borderRadius: 5,
    padding: 10,
    // borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#fff',
    position: 'absolute',
    right: -15,
    bottom: Dimensions.get('window').height * 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#000',
  },
  userLocation: {
    alignSelf: 'center',
  },
};
export default LocationButton;
