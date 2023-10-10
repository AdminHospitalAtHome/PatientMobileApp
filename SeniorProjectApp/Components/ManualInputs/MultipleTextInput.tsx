import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

export default function MultipleTextInput({
  modalTitle,
  modalUnit,
  inputTitles,
  numberRegex,
  setInput,
}: {
  modalTitle: string;
  modalUnit: string[];
  inputTitles: string[];
  numberRegex: RegExp[];
  setInput: React.Dispatch<React.SetStateAction<any>>[];
}): JSX.Element {
  //const [invalidVisible, setInvalidVisible] = useState(false);
  let invalidVisible: any[] = [];
  for (let i = 0; i < numberRegex.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    invalidVisible.push(useState(false));
  }

  function checkInput(text: string, num: number): void {
    if (numberRegex[num].test(text) || text === '') {
      invalidVisible[num][1](false);
      setInput[num](text);
    } else {
      invalidVisible[num][1](true);
    }
  }

  return (
    <View>
      <Text style={styles.modalText}>{modalTitle}</Text>
      <View>
        {inputTitles.map((title, index) => {
          return (
            <View
              style={index !== numberRegex.length - 1 && styles.inputBorder}>
              <View>
                <Text style={styles.modalLabel}>{title}</Text>
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => checkInput(text, index)}
                />
                <Text style={styles.modalUnitText}>{modalUnit[index]}</Text>
              </View>
              {invalidVisible[index][0] && (
                <Text style={styles.invalidInput}>Invalid Input!</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  invalidInput: {
    color: 'red',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 5,
  },
  modalUnitText: {
    fontSize: 25,
  },
  inputBorder: {
    borderBottomWidth: 3,
    borderColor: '#ba4618',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    fontSize: 25,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 200,
    margin: 10,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalLabel: {
    marginTop: 10,
    fontSize: 18,
    color: 'grey',
    alignItems: 'flex-start',
  },
});
