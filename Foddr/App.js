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
  StatusBar,
} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
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
import firestore from '@react-native-firebase/firestore';
import Geocoder from 'react-native-geocoding';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
const auth = firebase.auth();
const db = firebase.firestore();
// const perf = firebase.performance();
//function to request permission for android
//TODO add IOS suppport for permission requests
// Geocoder.init('AIzaSyBUoxEdl1gqBMAEgjGZpOMG7i3PQw9DKzo'); // use a valid API key

const permission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

//background color for our pages
const navTheme = DefaultTheme;
// navTheme.colors.background = colors.backgroundcolor;
navTheme.colors.background = '#fff';

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    permission();
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // console.log('user is currently logged in: ' + user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  if (initializing)
    return (
      <View>
        <Text>IK ben aan het opstarten</Text>
      </View>
    ); //make it return the splashscreen with our cute logo

  if (!user) {
    console.log('state = definitely not signed in');
    //the user is not logged in
    return (
      <SafeAreaProvider>
        <StatusBar
          backgroundColor="#61dafb00"
          // hidden={true}
          translucent={true}
        />
        <NavigationContainer theme={navTheme}>
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
      </SafeAreaProvider>
    );
  }
  console.log('state = definitely signed in');
  //Once the user creation has happened successfully, we can add the currentUser into firestore
  //with the appropriate details.
  //TODO change currentuser to use user??

  const currentUser = firebase.auth().currentUser;
  // console.log('You are: ' + JSON.stringify(currentUser));
  const uid = currentUser.uid;
  console.log('uid', uid);
  const ref = db.collection('users').doc(uid);
  const userData = {
    lastLoginTime: new Date(),
    // favorites: ['Lasagna bolognaise'],
  };
  firebase
    .firestore()
    .doc('users/' + uid)
    .set(userData, {merge: true});
  console.log(
    'All current user data ' +
      db.collection('users').doc(auth.currentUser.uid).get(),
  );

  // const usersCollection = db.collection('Users');
  // console.log(usersCollection);
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#d2d2d220"
        // hidden={true}
        translucent={true}
      />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName="Browse"
          backBehavior="history"
          screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {height: 60, padding: 10, paddingBottom: 5},
          }}>
          <Tab.Screen
            name="Discover"
            component={Home}
            options={{
              tabBarLabel: 'Discover',
              tabBarActiveTintColor: colors.maincolor,
              tabBarIcon: ({focused, color, size}) => (
                <FontIcon
                  name="compass"
                  color={focused ? colors.maincolor : colors.gray}
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
              tabBarActiveTintColor: colors.secondarycolor,
              tabBarIcon: ({focused, color, size}) => (
                <FontIcon
                  name="globe-europe"
                  color={focused ? colors.secondarycolor : colors.gray}
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
              tabBarActiveTintColor: colors.quatrarycolor,
              tabBarIcon: ({focused, color, size}) => (
                <FontIcon
                  name="heart"
                  color={focused ? colors.quatrarycolor : colors.gray}
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
              tabBarActiveTintColor: colors.triarycolor,
              tabBarIcon: ({focused, color, size}) => (
                <FontIcon
                  name="edit"
                  color={focused ? colors.triarycolor : colors.gray}
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
    </SafeAreaProvider>
  );
};

export default App;
