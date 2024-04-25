import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function AddButtons({
  setManualModalVisible,
  setAutoModalVisible,
}: {
  setManualModalVisible: React.Dispatch<React.SetStateAction<any>>;
  setAutoModalVisible: React.Dispatch<React.SetStateAction<any>>;
}): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => setManualModalVisible(true)}>
        <Text style={styles.buttonText}>Add Manually</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.pressable, styles.separatingLine]}
        onPress={() => setAutoModalVisible(true)}>
        <Text style={styles.buttonText}>Add Automatically</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
  },

  separatingLine: {
    borderColor: 'white',
    borderLeftWidth: 2,
  },
});
