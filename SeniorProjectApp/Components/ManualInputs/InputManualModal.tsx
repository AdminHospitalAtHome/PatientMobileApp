import {Modal, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {InputManualModalStyles} from './Styles';
export default function InputManualModal({
  setModalVisible,
  modalVisible,
  inputBoxes,
  addButtonFunction,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<any>>;
  modalVisible: boolean;
  inputBoxes: React.JSX.Element;
  addButtonFunction: () => void;
}): React.JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={InputManualModalStyles.centeredView}>
        <View style={InputManualModalStyles.modalView}>
          {inputBoxes}
          <View style={InputManualModalStyles.container}>
            <TouchableOpacity
              style={InputManualModalStyles.pressable}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={InputManualModalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                InputManualModalStyles.pressableBorder,
                InputManualModalStyles.pressable,
              ]}
              onPress={addButtonFunction}>
              <Text style={InputManualModalStyles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
