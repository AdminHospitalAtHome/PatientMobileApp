import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import {
  getBloodPressure,
  addBloodPressure,
} from '../../../BackEndFunctionCall/bloodPressureFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import MultipleTextInput from '../../../Components/ManualInputs/MultipleTextInput';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import DoubleLineChart from '../../../Components/DoubleLineChart';
import {PatientDetailStyles} from './Styles';

const patientID = 100000001;
const screenWidth = Dimensions.get('window').width;
export default function PatientBloodPressurePage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputSystolic, setInputSystolic] = useState('');
  const [inputDiastolic, setInputDiastolic] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodPressureData, setBloodPressureData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  //TODO: Change to dynamic later!!!!

  useEffect(() => {
    getBloodPressure(patientID, startDateTime, stopDateTime).then(
      // @ts-ignore
      setBloodPressureData,
    );
  }, [stopDateTime, startDateTime]);

  return (
    <View style={styles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <DoubleLineChart
          data={bloodPressureData}
          unit={'mmHg'}
          width={0.95 * screenWidth}
          height={170}
        />
      </View>
      <View style={PatientDetailStyles.dateSelectionContainer}>
        <DateSelectionBar
          setStartDateTime={setStartDateTime}
          setStopDateTime={setStopDateTime}
        />
      </View>
      <View style={PatientDetailStyles.vitalTableContainer}>
        <VitalTable
          columnTitles={['Date', 'Systolic', 'Diastolic']}
          vitalData={bloodPressureData}
        />
      </View>

      <AddButtons
        setManualModalVisible={setModalVisible}
        setAutoModalVisible={setModalVisible}
      />

      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        inputBoxes={
          <MultipleTextInput
            inputTitles={[
              'Systolic Blood Pressure',
              'Diastolic Blood Pressure',
            ]}
            modalTitle={'Add Blood Pressure'}
            modalUnit={['mmHg', 'mmHg']}
            numberRegex={[numberRegex, numberRegex]}
            setInput={[setInputSystolic, setInputDiastolic]}
          />
        }
        addButtonFunction={addBloodPressureOnClick}
      />

      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}
      {addFailedVisible && <AddFailedDialog setter={setAddFailedVisible} />}
    </View>
  );

  //todo: add boolean argument for auto input later
  function addBloodPressureOnClick(): void {
    if (
      inputSystolic === '' ||
      inputDiastolic === '' ||
      !numberRegex.test(inputSystolic) ||
      !numberRegex.test(inputDiastolic)
    ) {
      //todo: raise error message dialog
    } else {
      addBloodPressure(
        patientID,
        Number(inputSystolic),
        Number(inputDiastolic),
        true,
      ).then(successful => {
        setModalVisible(!modalVisible);
        if (successful === 'add successful') {
          setAddSuccessVisible(true);
        } else {
          // Failed view here
        }
        setStopDateTime(new Date().toISOString());
      });
      setInputDiastolic('');
      setInputSystolic('');
    }
  }
}

const styles = StyleSheet.create({
  modalLabel: {
    fontSize: 15,
    color: 'grey',
    alignItems: 'flex-start',
  },

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
