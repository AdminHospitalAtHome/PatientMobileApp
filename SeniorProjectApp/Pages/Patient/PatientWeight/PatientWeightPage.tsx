import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import {AddWeight} from "../../../BackEndFunctionCall/weightFunction/addWeight";

export default function PatientWeightPage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState<String>('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [invalidVisible, setInvalidVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text>Patient Weight Page</Text>
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={['Date', 'Time', 'Weight']} widthArr={[50, 50, 50]} />
          </Table>

      </View>
      <View style={{flexDirection: 'row'}}>
        <Button title={'Add Manually'} onPress={() => setModalVisible(true)} />
        <Button title={'Add automatically'} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Weight Data</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => checkInput(text)}
              />
              <Text style={{fontSize: 25}}>lb</Text>
            </View>
            {invalidVisible && (
              <Text style={{color: 'red'}}>Invalid Input!</Text>
            )}
            <View style={styles.modalButtonContainer}>
              <Button
                title={'Cancel'}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button title={'Add'} onPress={addWeight} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  function checkInput(text: string): void {
    if (numberRegex.test(text) || text === '') {
      setInvalidVisible(false);
      setInput(text);
    } else {
      setInvalidVisible(true);
    }
  }

  function addWeight(): void {

    AddWeight({patientId: 3, weight: Number(input), ifManualInput: true});
    setModalVisible(!modalVisible);
  }
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});
