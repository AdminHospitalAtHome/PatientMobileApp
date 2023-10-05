import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  TextInput, Dimensions,
} from 'react-native';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {
  addHeartRate,
  getHeartRate,
} from '../../BackEndFunctionCall/heartRateFunction';
import {Row, Rows, Table} from 'react-native-table-component';
import DateSellectionBar from '../../Components/DateSelectionBar';
import AddSuccessfullyDialog from '../../Components/Dialogs/AddSuccessfullyDialog';
import VitalTable from '../../Components/VitalTable';
import AddButtons from '../../Components/Dialogs/AddButtons';
import SingleTextInput from '../../Components/ManualInputs/SingleTextInput';
import InputManualModal from '../../Components/ManualInputs/InputManualModal';
import AddFailedDialog from "../../Components/Dialogs/AddFailedDialog";
import WeightLineChart from "../../Components/WeightLineChart";
export default function PatientHeartRatePage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState<String>('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [invalidVisible, setInvalidVisible] = useState(false);
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [heartData, setHeartData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const patientID = 3;

  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getHeartRate(patientID, startDateTime, stopDateTime).then(setHeartData);
    console.log(stopDateTime);
  }, [stopDateTime]);

  function addHeartRateOnClick(): void {
    if (input === '' || !numberRegex.test(input)) {
      //todo : raise error message/dialog
    } else {
      addHeartRate(3, Number(input), true).then(successful => {
        setModalVisible(!modalVisible);
        if (successful === 'add successful') {
          setAddSuccessVisible(true);
        } else {
          // Failed view here
          setAddFailedVisible(true);
        }
        setStopDateTime(new Date().toISOString());
      });
      setInput('');
    }
  }

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
            data={heartData}
            unit={'BPM'}
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
        columnTitles={['Date', 'Heart Rate (BPM)']}
        vitalData={heartData}
      />
      </View>
      <AddButtons
        setManualModalVisible={setModalVisible}
        setAutoModalVisible={setModalVisible}
      />
      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        addButtonFunction={addHeartRateOnClick}
        inputBoxes={
          <SingleTextInput
            modalTitle={'Add Heart Rate'}
            modalUnit={'BPM'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />
      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}
      {addFailedVisible && (
          <AddFailedDialog setter={setAddFailedVisible} />
      )}
    </View>
  );
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
