import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import {
  addHeartRate,
  getHeartRate,
} from '../../../BackEndFunctionCall/heartRateFunction';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import SingleLineChart from '../../../Components/SingleLineChart';
import {PatientDetailStyles} from './Styles';
export default function PatientHeartRatePage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState<string>('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [heartData, setHeartData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const patientID = 100000001;

  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    // @ts-ignore
    getHeartRate(patientID, startDateTime, stopDateTime).then(setHeartData);
  }, [stopDateTime, startDateTime]);

  function addHeartRateOnClick(): void {
    if (input === '' || !numberRegex.test(input)) {
      //todo : raise error message/dialog
    } else {
      addHeartRate(patientID, Number(input), true).then(successful => {
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
    <View style={PatientDetailStyles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <SingleLineChart
          data={heartData}
          unit={'BPM'}
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
      {addFailedVisible && <AddFailedDialog setter={setAddFailedVisible} />}
    </View>
  );
}
