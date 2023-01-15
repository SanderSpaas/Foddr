import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Dimensions
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import AddRecipe from '../pages/AddRecipe';
import Browse from '../pages/Browse';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import LoginChooser from '../pages/login/LoginChooser';
import Recipe from '../pages/Recipe';
import colors from '../theme/colors';
const Tab = createBottomTabNavigator();
const height = Dimensions.get('window').height;
const BottomNav = () => {
  return (
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
          tabBarItemStyle: { display: 'none' },
          // headerTitle: route.params.recipeId,
          // headerShown: true,
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
  );
};
export default BottomNav;
