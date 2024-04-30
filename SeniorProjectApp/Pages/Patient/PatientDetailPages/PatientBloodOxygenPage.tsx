import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {PatientDetailStyles} from './Styles';

import {
  getBloodOxygen,
  addBloodOxygenAutomatically,
  addBloodOxygenOnClick,
} from '../../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import SingleLineChart from '../../../Components/Charts/SingleLineChart';
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import ChangeDeviceModal from '../../../Components/AutomaticInputs/ChangeDeviceModal';
import LoadingModal from '../../../Components/AutomaticInputs/LoadingModal';

export default function PatientBloodOxygenPage(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [changeDeviceModalVisible, setChangeDeviceModalVisible] =
    useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState<any[][]>([]);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 100000001;
  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getBloodOxygen(patientID, startDateTime, stopDateTime).then(
      setBloodOxygenData,
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
          decimalPlaces={0}
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
        setAutoModalVisible={setChooseDeviceModalVisible}
      />
      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        addButtonFunction={() => {
          return addBloodOxygenOnClick(
            input,
            patientID,
            numberRegex,
            setModalVisible,
            modalVisible,
            setAddSuccessVisible,
            setAddFailedVisible,
            setStopDateTime,
            setInput,
          );
        }}
        inputBoxes={
          <SingleTextInput
            modalTitle={'Add Blood Oxygen'}
            modalUnit={'%'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />

      <ChooseDeviceModal
        setModalVisible={setChooseDeviceModalVisible}
        modalVisible={chooseDeviceModalVisible}
        setLoadingModalVisible={setLoadingModalVisible}
        setChangeDeviceModalVisible={setChangeDeviceModalVisible}
        vitalType={VitalType.BLOOD_OXYGEN}
      />

      <ChangeDeviceModal
        setModalVisible={setChangeDeviceModalVisible}
        modalVisible={changeDeviceModalVisible}
        setLoadingModalVisible={setLoadingModalVisible}
        setPreviousModalVisible={setChooseDeviceModalVisible}
        vitalType={VitalType.BLOOD_OXYGEN}
      />

      <LoadingModal
        setLoadingModalVisible={setLoadingModalVisible}
        loadingModalVisible={loadingModalVisible}
        sendToServer={(data: string[]) => {
          return addBloodOxygenAutomatically(
            data,
            patientID,
            setAddSuccessVisible,
            setAddFailedVisible,
            setStopDateTime,
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
