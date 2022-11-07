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
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator, HeaderTitle} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
// var ImagePicker = require('react-native-image-picker');
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import Articles from './pages/Articles';
// import Users from './pages/Users';
// import AddUser from './pages/AddUser';
// import AddArticle from './pages/AddArticle';
import Home from './pages/Home/Home';
import Browse from './pages/Browse/Browse';
import Icon from 'react-native-easy-icon';
import colors from './theme/colors';
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
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
const App: () => Node = () => {
  useEffect(() => {
    permission();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.maincolor,
          // headerBackground: () => (
          //   <Image
          //     style={{
          //       width: Dimensions.get('window').width,
          //       height: 150,
          //     }}
          //     source={require('./assets/images/wave.png')}
          //   />
          // ),
        }}>
        <Tab.Screen
          name="Discover"
          component={Browse}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({color, size}) => (
              <FontIcon name="compass" color={colors.gray} size={30} solid />
            ),
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({color, size}) => (
              <FontIcon
                name="globe-europe"
                color={colors.gray}
                size={30}
                solid
              />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Home}
          options={{
            tabBarLabel: 'Favourites',
            tabBarIcon: ({color, size}) => (
              <FontIcon name="heart" color={colors.gray} size={30} solid />
            ),
          }}
        />
        <Tab.Screen
          name="Add recipe"
          component={Home}
          options={{
            tabBarLabel: 'Add recipe',
            tabBarIcon: ({color, size}) => (
              <FontIcon name="edit" color={colors.gray} size={30} solid />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  // return (
  //   // <SafeAreaView>
  //   <NavigationContainer>
  //     <Drawer.Navigator
  //       initialRouteName="Articles"
  //       screenOptions={({navigation}) => ({
  //         // drawerActiveBackgroundColor: '#337bf6',
  //         drawerInactiveBackgroundColor: '#ebebeb',
  //         drawerInactiveTintColor: '#000',
  //         drawerItemStyle: {width: 180},
  //         // headerTitle: 'Customers',
  //         drawerStyle: {
  //           // backgroundColor: '#c6cbef',
  //           width: 220,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         },
  //         headerLeft: props => (
  //           <TouchableOpacity
  //             style={styles.iconContainer}
  //             onPress={navigation.toggleDrawer}>
  //             <Image
  //               style={styles.icon}
  //               source={require('./assets/img/icon.png')}
  //             />
  //           </TouchableOpacity>
  //         ),
  //       })}>
  //       <Drawer.Screen
  //         name="Users"
  //         component={Users}
  //         options={({navigation, route}) => ({
  //           headerRight: () => (
  //             <TouchableOpacity
  //               style={styles.button}
  //               onPress={() => {
  //                 navigation.navigate('Add user');
  //               }}>
  //               <Text style={styles.buttonText}>Add user</Text>
  //             </TouchableOpacity>
  //           ),
  //         })}
  //       />
  //       <Drawer.Screen
  //         name="Articles"
  //         component={Articles}
  //         options={({navigation, route}) => ({
  //           headerRight: () => (
  //             <TouchableOpacity
  //               style={styles.button}
  //               onPress={() => {
  //                 navigation.navigate('Add article');
  //               }}>
  //               <Text style={styles.buttonText}>Add article</Text>
  //             </TouchableOpacity>
  //           ),
  //         })}
  //       />
  //       <Drawer.Screen
  //         name="Add user"
  //         component={AddUser}
  //         options={({navigation, route}) => ({
  //           drawerItemStyle: {display: 'none'},
  //           headerRight: () => (
  //             <TouchableOpacity
  //               style={styles.button}
  //               onPress={() => {
  //                 navigation.navigate('Users');
  //               }}>
  //               <Text style={styles.buttonText}>Go back</Text>
  //             </TouchableOpacity>
  //           ),
  //         })}
  //       />
  //       <Drawer.Screen
  //         name="Add article"
  //         component={AddArticle}
  //         options={({navigation, route}) => ({
  //           drawerItemStyle: {display: 'none'},
  //           headerRight: () => (
  //             <TouchableOpacity
  //               style={styles.button}
  //               onPress={() => {
  //                 navigation.navigate('Articles');
  //               }}>
  //               <Text style={styles.buttonText}>Go back</Text>
  //             </TouchableOpacity>
  //           ),
  //         })}
  //       />
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  //   // </SafeAreaView>
  // );
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
