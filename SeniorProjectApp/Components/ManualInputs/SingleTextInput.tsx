import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {ManualTextInputStyle} from './Styles';
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
    } else {
      setInvalidVisible(true);
    }
    setInput(text);
  }

  return (
    <View>
      <Text style={ManualTextInputStyle.modalText}>{modalTitle}</Text>
      <View style={ManualTextInputStyle.inputRow}>
        <TextInput
          style={ManualTextInputStyle.input}
          onChangeText={text => checkInput(text)}
        />
        <Text style={ManualTextInputStyle.inputUnit}>{modalUnit}</Text>
      </View>
      {invalidVisible && (
        <Text style={ManualTextInputStyle.invalidInput}>Invalid Input!</Text>
      )}
    </View>
  );
}
