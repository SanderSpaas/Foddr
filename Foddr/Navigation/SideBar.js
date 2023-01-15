import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';
import Camera from '../components/CameraProfile';
import Card from '../components/Card';
import globalStyles from '../theme/globalStyles';
const auth = firebase.auth();

const SideBar = () => {
  const [fileUri, setFileUri] = useState();
  const [recipeData, setRecipeData] = useState();
  // const [recipeId, setRecipeId] = useState();
  const [isLoading, setLoading] = useState(false);
  const name = firebase.auth().currentUser.displayName;
  const navigation = useNavigation();
  // const {recipeId} = route.params;
  // console.log('route information', route);
  // console.log('navigation check', navigation);
  // console.log('recipeId from params', recipeId);
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
  // async function getRecipe() {
  //   try {
  //     const recipeData = await AsyncStorage.getItem('recipe');
  //     const recipeID = await AsyncStorage.getItem('id');
  //     setRecipeId(recipeID);
  //     setRecipeData(JSON.parse(recipeData));
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log('er gaat iets fout in de sidebar');
  //     console.log(error);
  //   }
  // }

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
            left: 276,
            padding: 0,
            height: 80,
            backgroundColor: 'white',
            borderBottomRightRadius: 50,
            borderTopRightRadius: 50,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
          },
          globalStyles.shadow,
        ]}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
          // getRecipe();
          setFileUri(firebase.auth().currentUser.photoURL);
        }}>
        <View
          style={[
            {
             
            },
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
            zIndex: 5,
            elevation: 5, //Android
            alignItems: 'center',
          }}
          source={require('../assets/images/spinner.png')}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={[
            globalStyles.buttonMedium,
            {
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              zIndex: 0,
              elevation: 0, //Android
            },
          ]}
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
