import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {
  getWeightCall,
  addWeight,
  addWeightAutomaticallyToServer,
} from '../../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../../Components/Dialogs/AddSuccessfullyDialog';
import DateSelectionBar from '../../../Components/DateSelectionBar';
import VitalTable from '../../../Components/VitalTable';
import SingleLineChart from '../../../Components/SingleLineChart';
import AddButtons from '../../../Components/AddButtons';
import InputManualModal from '../../../Components/ManualInputs/InputManualModal';
import SingleTextInput from '../../../Components/ManualInputs/SingleTextInput';
import AddFailedDialog from '../../../Components/Dialogs/AddFailedDialog';
import ChooseDeviceModal from '../../../Components/AutomaticInputs/ChooseDeviceModal';
import {PatientDetailStyles} from './Styles';
import DataModal from '../../../Components/AutomaticInputs/DataModal';
import {
  MedMDeviceConnection,
  parseXMLWeightData,
} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import LoadingModal from '../../../Components/AutomaticInputs/LoadingModal';

export default function PatientWeightPage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [weightData, setWeightData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  //TODO: Change to dynamic later!!!!
  const patientID = 100000001;
  const screenWidth: number = Dimensions.get('window').width;

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
        setAutoModalVisible={setChooseDeviceModalVisible}
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

      <ChooseDeviceModal
        setModalVisible={setChooseDeviceModalVisible}
        modalVisible={chooseDeviceModalVisible}
        setLoadingModalVisible={setLoadingModalVisible}
        vitalType={VitalType.WEIGHT}
      />

      <LoadingModal
        setLoadingModalVisible={setLoadingModalVisible}
        loadingModalVisible={loadingModalVisible}
        setDataModalVisible={setDataModalVisible}
      />

      <DataModal
        dataModalVisible={dataModalVisible}
        setDataModalVisible={setDataModalVisible}
        getVitalColumns={() => ['Date', 'Weight']}
        getVitalData={parseData}
        addDataFunction={addWeightAutomatically}
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

  function parseData(): any[][] {
    let output: any[][] = [];

    let data = MedMDeviceConnection.getInstance().getCollectedData();

    for (let i = 0; i < data.length; i++) {
      let parsedData: Record<string, any> = parseXMLWeightData(data[i]);
        console.log(parsedData.DateTimeTaken)
      output.push([parsedData.DateTimeTaken, parsedData.WeightInPounds]);
    }

    return output;
  }

  // TODO: Add Bulk function and change to check for error
  function addWeightAutomatically(data: any[][]) {
    for (let i = 0; i < data.length; i++) {
        console.log("ASDFSDF", data[i][0]);
      addWeightAutomaticallyToServer(patientID, Number(data[i][1]), data[i][0], false)
        .then(() => {
          setStopDateTime(new Date().toISOString());
          console.log('Added Good');
        })
        .catch(() => {
          console.log('FAIL');
        });
    }
    setAddSuccessVisible(true);
    setStopDateTime(new Date().toISOString());
  }
}
