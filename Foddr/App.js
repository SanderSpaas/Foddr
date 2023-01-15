import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StatusBar, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import BottomNav from './Navigation/BottemNav';
import SideBar from './Navigation/SideBar';
import Login from './pages/login/Login';
import LoginChooser from './pages/login/LoginChooser';
import Signup from './pages/login/Signup';
import colors from './theme/colors';
import Permissions from 'react-native-permissions';

const auth = firebase.auth();
const db = firebase.firestore();

const permission = () => {
  Permissions.request('camera').then(response => {
    console.log(response);
  });
  Permissions.request('photo').then(response => {
    console.log(response);
  });
  Permissions.request('location').then(response => {
    console.log(response);
  });
};

//background color for our pages
const navTheme = DefaultTheme;
// navTheme.colors.background = colors.backgroundcolor;
navTheme.colors.background = '#fff';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
  getUserName().then(name => {
    if (firebase.auth().currentUser.displayName === null) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          console.log('updated profile');
          removeItemValue('name');
          console.log(
            'All current user data ' +
              JSON.stringify(firebase.auth().currentUser?.toJSON()),
          );
        });
    }
  });

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#d2d2d220"
        // hidden={true}
        translucent={true}
      />

      <NavigationContainer theme={navTheme}>
        <Drawer.Navigator
          drawerContent={props => <SideBar />}
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="Profile" component={BottomNav} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
//getting our user name
async function getUserName() {
  try {
    const name = await AsyncStorage.getItem('name');
    if (name !== null) {
      // We have data!!
      console.log('name', name);
      return name;
    }
  } catch (error) {
    // Error retrieving data
    console.log('er gaat iets fout');
    console.log(error);
  }
  return 'The unnamed one';
}
async function removeItemValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
export default App;
