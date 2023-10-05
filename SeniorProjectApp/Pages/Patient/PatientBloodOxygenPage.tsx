import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import {
  getBloodOxygen,
  addBloodOxygen,
} from '../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../Components/Dialogs/AddSuccessfullyDialog';
import DateSellectionBar from '../../Components/DateSelectionBar';
import {addBloodPressure} from '../../BackEndFunctionCall/bloodPressureFunction';
import VitalTable from '../../Components/VitalTable';
import AddButtons from '../../Components/Dialogs/AddButtons';
import SingleTextInput from '../../Components/ManualInputs/SingleTextInput';
import InputManualModal from '../../Components/ManualInputs/InputManualModal';
import AddFailedDialog from '../../Components/Dialogs/AddFailedDialog';
import WeightLineChart from '../../Components/WeightLineChart';

export default function PatientBloodOxygen(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [invalidVisible, setInvalidVisible] = useState(false);
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 3;
  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getBloodOxygen(patientID, startDateTime, stopDateTime).then(
      setBloodOxygenData,
    );
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
        <WeightLineChart
          data={bloodOxygenData}
          unit={'%'}
          width={0.95 * screenWidth}
          height={170}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <DateSellectionBar
          setStartDateTime={setStartDateTime}
          setStopDateTime={setStopDateTime}
        />
      </View>
      <View style={{flex: 7, justifyContent: 'center'}}>
        <VitalTable
          columnTitles={['Date', 'Blood Oxygen (%)']}
          vitalData={bloodOxygenData}
        />
      </View>
      <AddButtons
        setManualModalVisible={setModalVisible}
        setAutoModalVisible={setModalVisible}
      />
      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        addButtonFunction={addBloodOxygenOnClick}
        inputBoxes={
          <SingleTextInput
            modalTitle={'Add Blood Oxygen'}
            modalUnit={'%'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />
      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}

      {addFailedVisible && <AddFailedDialog setter={setAddFailedVisible} />}
    </View>
  );
  function checkInput(
    text: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (numberRegex.test(text) || text === '') {
      setInvalidVisible(false);
      setInput(text);
    } else {
      setInvalidVisible(true);
    }
  }

  function addBloodOxygenOnClick(): void {
    if (input === '' || !numberRegex.test(input)) {
      //todo: raise error message dialog
    } else {
      addBloodOxygen(3, Number(input), true).then(successful => {
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
