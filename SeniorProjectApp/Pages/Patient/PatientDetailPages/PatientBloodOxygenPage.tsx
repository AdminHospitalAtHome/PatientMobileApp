import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {PatientDetailStyles} from './Styles';

import {
  getBloodOxygen,
  addBloodOxygen,
} from '../../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import SingleLineChart from '../../../Components/SingleLineChart';

export default function PatientBloodOxygen(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 300000001;
  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getBloodOxygen(patientID, startDateTime, stopDateTime).then(
      // @ts-ignore
      setBloodOxygenData, //TODO: suppressing typescript typing error, Fix Later...
    );
  }, [stopDateTime, startDateTime]);

  return (
    <View style={PatientDetailStyles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <SingleLineChart
          data={bloodOxygenData}
          unit={'%'}
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

  function addBloodOxygenOnClick(): void {
    if (input === '' || !numberRegex.test(input)) {
      //todo: raise error message dialog
    } else {
      addBloodOxygen(patientID, Number(input), true).then(successful => {
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
