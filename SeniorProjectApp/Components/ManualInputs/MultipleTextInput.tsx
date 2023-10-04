import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
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
  var invalidVisible: any[] = [];
  for (var i = 0; i < numberRegex.length; i++) {
    invalidVisible.push(useState(false));
  }

  function checkInput(text: string, i: number): void {
    if (numberRegex[i].test(text) || text === '') {
      invalidVisible[i][1](false);
      setInput[i](text);
    } else {
      invalidVisible[i][1](true);
    }
  }

  return (
    <View>
      <Text style={styles.modalText}>{modalTitle}</Text>
      <View>
        {inputTitles.map((title, index) => {
          return (
            <View style={index !== (numberRegex.length-1) && ({borderBottomWidth: 3, borderColor: '#ba4618'})}>
              <View>
                <Text style={styles.modalLabel}>{title}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  onChangeText={text => checkInput(text, index)}
                />
                <Text style={{fontSize: 25}}>{modalUnit[index]}</Text>
              </View>
              {invalidVisible[index][0] && (
                <Text style={{color: 'red'}}>Invalid Input!</Text>
              )}
            </View>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
