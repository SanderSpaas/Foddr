// import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// var ImagePicker = require('react-native-image-picker');
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Home from './pages/Home/Home';
import Browse from './pages/Browse/Browse';
import Favorites from './pages/Favorites/Favorites';
import Recipe from './pages/Recipe';
import LoginChooser from './pages/login/LoginChooser';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import AddRecipe from './pages/AddRecipe';
import colors from './theme/colors';
import {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
const auth = firebase.auth();
const db = firebase.firestore();
// const perf = firebase.performance();
//function to request permission for android
//TODO add IOS suppport for permission requests
const permission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
};
GoogleSignin.configure({
  webClientId:
    '553114964900-o71tse0mnis9mvgiipjh7hftue9egqjg.apps.googleusercontent.com',
  ClientId:
    '553114964900-o71tse0mnis9mvgiipjh7hftue9egqjg.apps.googleusercontent.com',
  offlineAccess: true,
});

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  useEffect(() => {
    permission();
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    // console.log('user is currently logged in: ' + user);

    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  if (initializing) return null; //make it return the splashscreen with our cute logo

  if (!user) {
    console.log('state = definitely not signed in');
    //the user is not logged in
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="LoginChooser"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {display: 'none'},
          }}>
          {/* //hidden tabs so we can navigate to them */}
          <Tab.Screen
            name="LoginChooser"
            component={LoginChooser}
            options={{
              tabBarItemStyle: {display: 'none'},
              tabBarLabel: 'LoginChooser',
              tabBarIcon: ({color, size}) => (
                <FontIcon name="edit" color={colors.gray} size={30} solid />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarItemStyle: {display: 'none'},
              tabBarLabel: 'Login',
              tabBarIcon: ({color, size}) => (
                <FontIcon name="edit" color={colors.gray} size={30} solid />
              ),
            }}
          />
          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarItemStyle: {display: 'none'},
              tabBarLabel: 'Signup',
              tabBarIcon: ({color, size}) => (
                <FontIcon name="edit" color={colors.gray} size={30} solid />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  console.log('state = definitely signed in');
  //Once the user creation has happened successfully, we can add the currentUser into firestore
  //with the appropriate details.
  //TODO change currentuser to use user??
  const ref = db.collection('users').doc(uid);
  const currentUser = firebase.auth().currentUser;
  // console.log('You are: ' + JSON.stringify(currentUser));
  const uid = currentUser.uid;
  const userData = {
    lastLoginTime: new Date(),
    // favorites: ['Lasagna bolognaise'],
  };
  firebase
    .firestore()
    .doc('users/' + uid)
    .set(userData, {merge: true});
  // console.log(
  //   'All current user data ' +
  //     db.collection('users').doc(auth.currentUser.uid).get(),
  // );

  // const usersCollection = db.collection('Users');
  // console.log(usersCollection);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Discover"
          component={Home}
          options={{
            tabBarLabel: 'Discover',
            tabBarActiveTintColor: colors.firstColor,
            tabBarIcon: ({focused, color, size}) => (
              <FontIcon
                name="compass"
                color={focused ? colors.firstColor : colors.gray}
                size={30}
                solid
              />
            ),
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarLabel: 'Browse',
            tabBarActiveTintColor: colors.secondColor,
            tabBarIcon: ({focused, color, size}) => (
              <FontIcon
                name="globe-europe"
                color={focused ? colors.secondColor : colors.gray}
                size={30}
                solid
              />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favourites',
            tabBarActiveTintColor: colors.thirthColor,
            tabBarIcon: ({focused, color, size}) => (
              <FontIcon
                name="heart"
                color={focused ? colors.thirthColor : colors.gray}
                size={30}
                solid
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add recipe"
          component={AddRecipe}
          options={{
            tabBarLabel: 'Add recipe',
            tabBarActiveTintColor: colors.fourthColor,
            tabBarIcon: ({focused, color, size}) => (
              <FontIcon
                name="edit"
                color={focused ? colors.fourthColor : colors.gray}
                size={30}
                solid
              />
            ),
          }}
        />
        {/* //hidden tabs so we can navigate to them */}
        <Tab.Screen
          name="Recipe"
          component={Recipe}
          options={({navigation, route}) => ({
            tabBarLabel: 'Recipe',
            tabBarItemStyle: {display: 'none'},
            tabBarIcon: ({focused, color, size}) => (
              <FontIcon
                name="edit"
                color={focused ? colors.pink : colors.gray}
                // color={colors.gray}
                size={30}
                solid
              />
            ),
          })}
        />
        <Tab.Screen
          name="LoginChooser"
          component={LoginChooser}
          options={{
            tabBarLabel: 'LoginChooser',
            tabBarItemStyle: {display: 'none'},
            tabBarIcon: ({color, size}) => (
              <FontIcon name="edit" color={colors.gray} size={30} solid />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: 'Login',
            drawerItemStyle: {display: 'none'},
            tabBarIcon: ({color, size}) => (
              <FontIcon name="edit" color={colors.gray} size={30} solid />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  icon: {
    width: 30,
    height: 40,
  },
  button: {
    backgroundColor: '#ededed',
    borderRadius: 15,
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    width: 100,
    marginRight: 10,
  },
  buttonText: {textAlign: 'center'},
});

export default App;
