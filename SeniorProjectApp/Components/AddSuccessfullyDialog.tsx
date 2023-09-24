import {Modal, View, Button, Text, StyleSheet} from "react-native";
import {useState} from 'react';

export default function AddSuccessfullyDialog(): JSX.Element {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Successfully</Text>
          <View style={styles.modalButtonContainer}>
            <Button title={'Confirm'} onPress={() => setVisible(!visible)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
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
});

