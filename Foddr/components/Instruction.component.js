import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
const Instruction = props => {
  return (
    <SafeAreaView style={styles.card}>
      <Text style={styles.number}>{props.index + 1}</Text>
      <SafeAreaView style={styles.todoItem}>
        <Text style={styles.text}>{props.instruction}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props.deleteCallback(props.index)}>
          <FontIcon name="trash" size={25} solid color={colors.textcolor} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    // borderRadius: 5,
    // borderBottomWidth: 5,
    // borderBottomColor: colors.thirthColor,
  },
  colordBorder: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.maincolor,
    // borderTopColor: colors.firstColor,
    // borderRightColor: colors.secondColor,
    // borderBottomColor: colors.thirthColor,
    // borderLeftColor: colors.fourthColor,
  },
  text: {
    color: colors.textcolor,
  },
  number: {
    color: colors.textcolor,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  todoItem: {
    marginLeft: 15,
    flex: 3,
    color: colors.textcolor,
    // backgroundColor: colors.pink,
    height: 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingLeft: 10,
  },
  deleteButton: {
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Instruction;
