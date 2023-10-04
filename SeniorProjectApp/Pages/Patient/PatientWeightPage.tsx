import React, {useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  getWeightCall,
  addWeight,
} from '../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../Components/AddSuccessfullyDialog';
import DateSellectionBar from '../../Components/DateSelectionBar';
import VitalTable from '../../Components/VitalTable';
import WeightLineChart from '../../Components/WeightLineChart';
import AddButtons from '../../Components/AddButtons';
import InputManualModal from '../../Components/ManualInputs/InputManualModal';
import SingleTextInput from '../../Components/ManualInputs/SingleTextInput';

export default function PatientWeightPage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [weightData, setWeightData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

  //TODO: Change to dynamic later!!!!
  const patientID = 3;

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(response => {
      setWeightData(response);
    });
  }, [stopDateTime]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <WeightLineChart data={weightData} unit={'lb'} />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <DateSellectionBar
          setStartDateTime={setStartDateTime}
          setStopDateTime={setStopDateTime}
        />
      </View>
      <View style={{flex: 7, justifyContent: 'center'}}>
        <VitalTable columnTitles={['Date', 'Weight']} vitalData={weightData} />
      </View>
      <AddButtons
        setManualModalVisible={setModalVisible}
        setAutoModalVisible={setModalVisible}
      />

      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        addButtonFunction={addWeightOnClick}
        inputBoxes={
          <SingleTextInput
            modalTitle={'Add Weight'}
            modalUnit={'lbs'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />
      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}
    </View>
  );

  function addWeightOnClick() {
    if (input === '' || !numberRegex.test(input)) {
      //todo : raise error message/dialog
    } else {
      addWeight({
        patientId: 3,
        weight: Number(input),
        ifManualInput: true,
      }).then(successful => {
        setModalVisible(!modalVisible);
        if (successful === 'add successful') {
          setAddSuccessVisible(true);
        } else {
          // Failed view here
        }
        setStopDateTime(new Date().toISOString());
      });
      setInput('');
    }
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
