import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {PatientDetailStyles} from './Styles';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import {
  addSpirometryAutomatically,
  addSpirometryOnClick,
  getSpirometry,
  parseSpirometryForChart,
} from '../../../BackEndFunctionCall/spirometryFunction';
import SingleLineChart from '../../../Components/SingleLineChart';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import AddButtons from '../../../Components/AddButtons';
import MultipleTextInput from '../../../Components/ManualInputs/MultipleTextInput';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import ChangeDeviceModal from '../../../Components/AutomaticInputs/ChangeDeviceModal';
import SpirometryReadingModal from '../../../Components/AutomaticInputs/SpirometryReadingModal';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';

export default function PatientSpirometryPage(): React.JSX.Element {
  const patientID = 100000001;
  const screenWidth = Dimensions.get('window').width;
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [changeDeviceModalVisible, setChangeDeviceModalVisible] =
    useState(false);

  const [inputFEV1, setInputFEV1] = useState('');
  const [inputFEV1_FVC, setInputFEV1_FVC] = useState('');
  const FEV1_FVCRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const FEV1Regex = /^(\d+(\.\d*)?)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [spirometryData, setSpirometryData] = useState<any[][]>([]);
  const [readingModalVisible, setReadingModalVisible] = useState(false);

  useEffect(() => {
    getSpirometry(patientID, startDateTime, stopDateTime).then(data => {
      setSpirometryData(data);
    });
  }, [stopDateTime, startDateTime]);

  return (
    <View style={PatientDetailStyles.container}>
      <View style={PatientDetailStyles.chartContainer}>
        <SingleLineChart
          data={parseSpirometryForChart(spirometryData)}
          unit={'L'}
          width={0.95 * screenWidth}
          height={170}
          decimalPlaces={2}
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
          columnTitles={['Date', 'FEV1', 'FEV1/FVC']}
          vitalData={spirometryData}
        />
      </View>

      <AddButtons
        setManualModalVisible={setModalVisible}
        setAutoModalVisible={setChooseDeviceModalVisible}
      />

      <InputManualModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        inputBoxes={
          <MultipleTextInput
            inputTitles={['FEV1', 'FEV1/FVC']}
            modalTitle={'Add Blood Pressure'}
            modalUnit={['L', '%']}
            numberRegex={[FEV1Regex, FEV1_FVCRegex]}
            setInput={[setInputFEV1, setInputFEV1_FVC]}
          />
        }
        addButtonFunction={() => {
          return addSpirometryOnClick(
            inputFEV1,
            inputFEV1_FVC,
            patientID,
            FEV1Regex,
            FEV1_FVCRegex,
            setModalVisible,
            modalVisible,
            setAddSuccessVisible,
            setAddFailedVisible,
            setStopDateTime,
            setInputFEV1,
            setInputFEV1_FVC,
          );
        }}
      />

      <ChooseDeviceModal
        setModalVisible={setChooseDeviceModalVisible}
        modalVisible={chooseDeviceModalVisible}
        setLoadingModalVisible={setReadingModalVisible}
        setChangeDeviceModalVisible={setChangeDeviceModalVisible}
        vitalType={VitalType.SPIROMETRY}
      />

      <ChangeDeviceModal
        setModalVisible={setChangeDeviceModalVisible}
        modalVisible={changeDeviceModalVisible}
        setLoadingModalVisible={setReadingModalVisible}
        setPreviousModalVisible={setChooseDeviceModalVisible}
        vitalType={VitalType.SPIROMETRY}
      />
      {/*Instead of using the normal Loading Modal, we walk the user through 3 readings...*/}
      <SpirometryReadingModal
        readingModalVisible={readingModalVisible}
        setReadingModalVisible={setReadingModalVisible}
        sendToServer={(data: string[]) => {
          return addSpirometryAutomatically(
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
