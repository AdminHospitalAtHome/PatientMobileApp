import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import getAccessbilityMode from '../BackEndFunctionCall/userInfo';

export default function Switch({mode}: {mode: boolean}) {

  if (mode) {
    return (
      <View style={styles.greenContainer}>
        <View style={styles.greenBall} />
      </View>
    );
  } else {
    return (
      <View style={styles.blackContainer}>
        <View style={styles.blackBall} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  greenContainer: {
    width: 55,
    height: 28,
    backgroundColor: 'green',
    borderRadius: 20,
    justifyContent: 'center',
  },
  greenBall: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 27,
    marginRight: 2,
  },
  blackContainer: {
    width: 55,
    height: 28,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
  },
  blackBall: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 2,
    marginRight: 2,
  },
});
