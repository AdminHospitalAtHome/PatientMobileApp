import {Modal, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

export default function InputManualModal({
  setModalVisible,
  modalVisible,
  inputBoxes,
  addButtonFunction,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<any>>;
  modalVisible: boolean;
  inputBoxes: JSX.Element;
  addButtonFunction: () => void;
}): JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {inputBoxes}
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.pressable}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pressableBorder, styles.pressable]}
              onPress={addButtonFunction}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  pressableBorder: {
    borderColor: 'white',
    borderLeftWidth: 2,
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
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,

    justifyContent: 'space-around',
  },
});
