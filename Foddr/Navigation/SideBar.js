import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions, Image, Text, TouchableOpacity, View
} from 'react-native';
import 'react-native-gesture-handler';
import Camera from '../components/CameraProfile';
import Card from '../components/Card';
import globalStyles from '../theme/globalStyles';
const auth = firebase.auth();

const SideBar = ({}) => {
  const [fileUri, setFileUri] = useState();
  const [recipeData, setRecipeData] = useState();
  const [recipeId, setRecipeId] = useState();
  const [isLoading, setLoading] = useState(false);
  const name = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();

  async function saveOnline(base64) {
    const fileUploadTask = storage()
      .ref('profilePics/' + auth.currentUser.uid + '.jpeg')
      .putString(base64, firebase.storage.StringFormat.BASE64);

    fileUploadTask.on('state_changed', taskSnapshot => {
      setLoading(true);
      console.log(`${taskSnapshot.bytesTransferred} transferred 
        out of ${taskSnapshot.totalBytes}`);
    });

    fileUploadTask.then(() => {
      // Get the URL of the uploaded image
      fileUploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        firebase
          .auth()
          .currentUser.updateProfile({
            photoURL: downloadURL,
          })
          .then(() => {
            console.log('updated profile picture');
            setLoading(false);
            setFileUri(downloadURL);
          });
      });
    });
  }
  async function getRecipe() {
    try {
      const recipeData = await AsyncStorage.getItem('recipe');
      const recipeID = await AsyncStorage.getItem('id');
      setRecipeId(recipeID);
      setRecipeData(JSON.parse(recipeData));
    } catch (error) {
      // Error retrieving data
      console.log('er gaat iets fout in de sidebar');
      console.log(error);
    }
  }

  const height = Dimensions.get('window').height;
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
        style={[
          {
            position: 'absolute',
            top: height / 2 - 40,
            left: 250,
          },
        ]}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
          getRecipe();
          setFileUri(firebase.auth().currentUser.photoURL);
        }}>
        <View
          style={[
            {
              backgroundColor: 'white',
              borderBottomRightRadius: 50,
              borderTopRightRadius: 50,
              padding: 20,
              paddingLeft: 35,
            },
            globalStyles.shadow,
          ]}>
          <Text
            style={[
              globalStyles.text,
              {
                fontSize: 30,
              },
            ]}>
            >
          </Text>
        </View>
      </TouchableOpacity>
      <Camera
        isLoading={isLoading}
        saveOnline={saveOnline}
        uri={fileUri}
        name={name}
        style={{padding: 20}}
      />

      {recipeData && (
        <>
          <Text style={[globalStyles.title, {fontSize: 15, padding: 20}]}>
            Last viewed recipe:
          </Text>
          <Card recipe={recipeData} recipeId={recipeId} sidebar={true} />
        </>
      )}
      <View style={{position: 'absolute', bottom: 25}}>
        <Image
          style={{
            width: 75,
            height: 100,

            position: 'absolute',
            bottom: -2,
            left: -5,
            zIndex: 2,
            elevation: 2, //Android
            alignItems: 'center',
          }}
          source={require('../assets/images/spinner.png')}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={[globalStyles.buttonMedium]}
          onPress={() => {
            auth.signOut().then(() => console.log('User signed out!'));
          }}>
          <Text style={globalStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SideBar;
