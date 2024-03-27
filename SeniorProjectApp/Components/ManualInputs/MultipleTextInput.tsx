import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {ManualTextInputStyle, MultiTextInputStyle} from './Styles';
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
    } else {
      invalidVisible[num][1](true);
    }
    setInput[num](text);
  }

  return (
    <View>
      <Text style={ManualTextInputStyle.modalText}>{modalTitle}</Text>
      <View>
        {inputTitles.map((title, index) => {
          return (
            <View
              style={
                index !== numberRegex.length - 1 &&
                MultiTextInputStyle.inputBorder
              }>
              <View>
                <Text style={MultiTextInputStyle.modalLabel}>{title}</Text>
              </View>
              <View style={ManualTextInputStyle.inputRow}>
                <TextInput
                  style={ManualTextInputStyle.input}
                  onChangeText={text => checkInput(text, index)}
                />
                <Text style={MultiTextInputStyle.modalUnitText}>
                  {modalUnit[index]}
                </Text>
              </View>
              {invalidVisible[index][0] && (
                <Text style={ManualTextInputStyle.invalidInput}>
                  Invalid Input!
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
