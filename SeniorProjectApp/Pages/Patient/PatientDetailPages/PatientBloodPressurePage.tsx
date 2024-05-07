import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import {
  getBloodPressure,
  addBloodPressureOnClick,
  addBloodPressureAutomatically,
} from '../../../BackEndFunctionCall/bloodPressureFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import MultipleTextInput from '../../../Components/ManualInputs/MultipleTextInput';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import DoubleLineChart from '../../../Components/Charts/DoubleLineChart';
import {PatientDetailStyles} from './Styles';
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import LoadingModal from '../../../Components/AutomaticInputs/LoadingModal';
import ChangeDeviceModal from '../../../Components/AutomaticInputs/ChangeDeviceModal';

const patientID = 100000001;
const screenWidth = Dimensions.get('window').width;
export default function PatientBloodPressurePage(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [changeDeviceModalVisible, setChangeDeviceModalVisible] =
    useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [inputSystolic, setInputSystolic] = useState('');
  const [inputDiastolic, setInputDiastolic] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodPressureData, setBloodPressureData] = useState<any[][]>([]);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  //TODO: Change to dynamic later!!!!

  useEffect(() => {
    getBloodPressure(patientID, startDateTime, stopDateTime).then(data => {
      setBloodPressureData(data);
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
        // TODO: Uncomment to add Automatic Adding of Vitals...
        // setAutoModalVisible={setChooseDeviceModalVisible}
        // TODO: Comment to add Automatic Adding of Vitals...
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

      {/* TODO: Uncomment to add Automatic Adding of Vitals... */}
      {/*<ChooseDeviceModal*/}
      {/*  setModalVisible={setChooseDeviceModalVisible}*/}
      {/*  modalVisible={chooseDeviceModalVisible}*/}
      {/*  setLoadingModalVisible={setLoadingModalVisible}*/}
      {/*  setChangeDeviceModalVisible={setChangeDeviceModalVisible}*/}
      {/*  vitalType={VitalType.BLOOD_PRESSURE}*/}
      {/*/>*/}

      {/*<ChangeDeviceModal*/}
      {/*  setModalVisible={setChangeDeviceModalVisible}*/}
      {/*  modalVisible={changeDeviceModalVisible}*/}
      {/*  setLoadingModalVisible={setLoadingModalVisible}*/}
      {/*  setPreviousModalVisible={setChooseDeviceModalVisible}*/}
      {/*  vitalType={VitalType.BLOOD_PRESSURE}*/}
      {/*/>*/}

      <LoadingModal
        setLoadingModalVisible={setLoadingModalVisible}
        loadingModalVisible={loadingModalVisible}
        sendToServer={(data: string[]) => {
          return addBloodPressureAutomatically(
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
