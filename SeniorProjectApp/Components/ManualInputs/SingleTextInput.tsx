import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

export default function SingleTextInput({
  modalTitle,
  modalUnit,
  numberRegex,
  setInput,
}: {
  modalTitle: string;
  modalUnit: string;
  numberRegex: RegExp;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  const [invalidVisible, setInvalidVisible] = useState(false);
  function checkInput(text: string): void {
    if (numberRegex.test(text) || text === '') {
      setInvalidVisible(false);
      setInput(text);
    } else {
      setInvalidVisible(true);
    }
  }

  return (
    <View>
      <Text style={styles.modalText}>{modalTitle}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          onChangeText={text => checkInput(text)}
        />
        <Text style={styles.inputUnit}>{modalUnit}</Text>
      </View>
      {invalidVisible && (
        <Text style={styles.invalidInput}>Invalid Input!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 5,
    fontSize: 25,
    textAlign: 'center',
  },

  inputUnit: {fontSize: 25},
  invalidInput: {
    color: 'red',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 5,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});
