import {Modal, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AddDialogStyle} from './Styles';

export default function AddFailedDialog({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={AddDialogStyle.centeredView}>
        <View style={AddDialogStyle.modalView}>
          <Text style={AddDialogStyle.modalText}>Failed To Add</Text>
          <View style={AddDialogStyle.container}>
            <TouchableOpacity onPress={() => setter(false)}>
              <Text style={AddDialogStyle.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
