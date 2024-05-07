import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {
  addWeightAutomatically,
  addWeightOnClick,
  getWeightCall,
} from '../../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import SingleLineChart from '../../../Components/Charts/SingleLineChart';
import AddButtons from '../../../Components/AddButtons';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {PatientDetailStyles} from './Styles';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import LoadingModal from '../../../Components/AutomaticInputs/LoadingModal';
import ChangeDeviceModal from '../../../Components/AutomaticInputs/ChangeDeviceModal';

export default function PatientWeightPage(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [changeDeviceModalVisible, setChangeDeviceModalVisible] =
    useState(false);
  const [input, setInput] = useState('');
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [weightData, setWeightData] = useState<any[][]>([]);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 100000001;
  const screenWidth: number = Dimensions.get('window').width;
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(response => {
      setWeightData(response);
    });
  }, [stopDateTime, startDateTime]);

  return (
    <View style={PatientDetailStyles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <SingleLineChart
          data={weightData}
          unit={'lb'}
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
        <VitalTable columnTitles={['Date', 'Weight']} vitalData={weightData} />
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
        addButtonFunction={() => {
          return addWeightOnClick(
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
            modalTitle={'Add Weight'}
            modalUnit={'lbs'}
            setInput={setInput}
            numberRegex={numberRegex}
          />
        }
      />

      {/* TODO: Uncomment to add Automatic Adding of Vitals... */}
      {/*<ChooseDeviceModal*/}
      {/*  setModalVisible={setChooseDeviceModalVisible}*/}
      {/*  modalVisible={chooseDeviceModalVisible}*/}
      {/*  setLoadingModalVisible={setLoadingModalVisible}*/}
      {/*  setChangeDeviceModalVisible={setChangeDeviceModalVisible}*/}
      {/*  vitalType={VitalType.WEIGHT}*/}
      {/*/>*/}

      {/*<ChangeDeviceModal*/}
      {/*  setModalVisible={setChangeDeviceModalVisible}*/}
      {/*  modalVisible={changeDeviceModalVisible}*/}
      {/*  setLoadingModalVisible={setLoadingModalVisible}*/}
      {/*  setPreviousModalVisible={setChooseDeviceModalVisible}*/}
      {/*  vitalType={VitalType.WEIGHT}*/}
      {/*/>*/}

      <LoadingModal
        setLoadingModalVisible={setLoadingModalVisible}
        loadingModalVisible={loadingModalVisible}
        sendToServer={(data: string[]) => {
          return addWeightAutomatically(
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
