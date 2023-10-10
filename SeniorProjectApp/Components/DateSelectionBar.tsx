import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function DateSelectionBar({
  setStartDateTime,
  setStopDateTime,
}: {
  setStartDateTime: React.Dispatch<React.SetStateAction<any>>;
  setStopDateTime: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => select(1, setStartDateTime, setStopDateTime)}>
        <Text style={styles.buttonText}>Day</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.pressable,
          {borderColor: 'white', borderLeftWidth: 2, borderRightWidth: 2},
        ]}
        onPress={() => select(7, setStartDateTime, setStopDateTime)}>
        <Text style={styles.buttonText}>Week</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => select(31, setStartDateTime, setStopDateTime)}>
        <Text style={styles.buttonText}>Month</Text>
      </TouchableOpacity>
    </View>
  );
}

function select(
  selection: number,
  setStartDateTime: React.Dispatch<React.SetStateAction<any>>,
  setStopDateTime: React.Dispatch<React.SetStateAction<any>>,
): void {
  const startDateTimeTemp = new Date();
  startDateTimeTemp.setHours(0, 0, 0, 0);
  startDateTimeTemp.setDate(startDateTimeTemp.getDate() - selection);
  setStartDateTime(startDateTimeTemp.toISOString());
  setStopDateTime(new Date().toISOString());
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'space-around',
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
});
