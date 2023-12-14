import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import {
  addHeartRateAutomatically,
  addHeartRateOnClick,
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
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import LoadingModal from '../../../Components/AutomaticInputs/LoadingModal';
export default function PatientHeartRatePage(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [input, setInput] = useState<string>('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [heartData, setHeartData] = useState<any[][]>([]);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const patientID = 100000001;

  const screenWidth: number = Dimensions.get('window').width;

  useEffect(() => {
    getHeartRate(patientID, startDateTime, stopDateTime).then(setHeartData);
  }, [stopDateTime, startDateTime]);

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
        setAutoModalVisible={setChooseDeviceModalVisible}
      />
      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        addButtonFunction={() => {
          return addHeartRateOnClick(
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
            modalTitle={'Add Heart Rate'}
            modalUnit={'BPM'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />
      <ChooseDeviceModal
        setModalVisible={setChooseDeviceModalVisible}
        modalVisible={chooseDeviceModalVisible}
        setLoadingModalVisible={setLoadingModalVisible}
        vitalType={VitalType.HEART_RATE}
      />

      <LoadingModal
        setLoadingModalVisible={setLoadingModalVisible}
        loadingModalVisible={loadingModalVisible}
        sendToServer={(data: string[]) => {
          return addHeartRateAutomatically(
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
