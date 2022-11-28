import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'

class ImageHeader extends Component {
    render() {
        return (
             <View style={styles.imagecontainer}>
            <TouchableHighlight
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <>
                <FontIcon
                  style={styles.arrow}
                  name="arrow-left"
                  size={20}
                  solid
                />
                <View style={styles.arrowBackdrop}></View>
              </>
            </TouchableHighlight>
            <View style={styles.likeContainer}>
              <Like likes={recipeData.likes} recipeId={route.params.id} />
            </View>
            <Text style={styles.titleText}>{recipeData.name}</Text>
            <Text style={styles.timeText}>{recipeData.time}min</Text>
            <Image style={styles.image} source={{uri: recipeData.image}} />
            <SVGImg
              style={styles.overlay}
              width={Dimensions.get('window').width}
              height={200}
            />
          </View>
        );
    }
}

export default ImageHeader;