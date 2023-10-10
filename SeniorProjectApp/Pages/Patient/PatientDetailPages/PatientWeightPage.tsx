import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {
  getWeightCall,
  addWeight,
} from '../../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import WeightLineChart from '../../../Components/WeightLineChart';
import AddButtons from '../../../Components/AddButtons';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import {PatientDetailStyles} from './Styles';
export default function PatientWeightPage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [weightData, setWeightData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 300000001;
  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(response => {
      // @ts-ignore
      setWeightData(response);
    });
  }, [stopDateTime, startDateTime]);

  return (
    <View style={PatientDetailStyles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <WeightLineChart
          data={weightData}
          unit={'lb'}
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
      {addFailedVisible && <AddFailedDialog setter={setAddFailedVisible} />}
    </View>
  );

  function addWeightOnClick() {
    if (input === '' || !numberRegex.test(input)) {
      //todo : raise error message/dialog
    } else {
      addWeight(patientID, Number(input), true).then(successful => {
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
