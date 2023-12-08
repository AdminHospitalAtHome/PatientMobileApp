import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import {
  getBloodPressure,
  addBloodPressureOnClick,
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
    getBloodPressure(patientID, startDateTime, stopDateTime).then(data => {
      // @ts-ignore
      setBloodPressureData(data);
      console.log("DetailPage", data);
    });
  }, [stopDateTime, startDateTime]);

  return (
    <View style={PatientDetailStyles.container}>
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
        addButtonFunction={() => {
          return addBloodPressureOnClick(
            inputSystolic,
            inputDiastolic,
            numberRegex,
            patientID,
            setModalVisible,
            modalVisible,
            setAddSuccessVisible,
            setAddFailedVisible,
            setStopDateTime,
            setInputDiastolic,
            setInputSystolic,
          );
        }}
      />

      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}
      {addFailedVisible && <AddFailedDialog setter={setAddFailedVisible} />}
    </View>
  );
}
