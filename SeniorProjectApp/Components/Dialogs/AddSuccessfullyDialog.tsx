import {
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function AddSuccessfullyDialog({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Added Successfully</Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setter(false)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 10,
    borderRadius: 10,

    justifyContent: 'space-around',
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
  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
