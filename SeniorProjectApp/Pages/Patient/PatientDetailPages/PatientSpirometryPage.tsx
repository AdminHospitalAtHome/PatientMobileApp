import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';

import {PatientDetailStyles} from './Styles';
import getDefaultStartTime from "../../../BackEndFunctionCall/getDefaultStartTime";
import {
  getSpirometry,
  parseSpirometryForChart,
} from '../../../BackEndFunctionCall/spirometryFunction';
import SingleLineChart from "../../../Components/SingleLineChart";
import DateSelectionBar from "../../../Components/DateSelectionBar";
import VitalTable from "../../../Components/VitalTable";
import AddButtons from "../../../Components/AddButtons";
import MultipleTextInput from "../../../Components/ManualInputs/MultipleTextInput";
import {addBloodPressureOnClick} from "../../../BackEndFunctionCall/bloodPressureFunction";
import InputManualModal from "../../../Components/ManualInputs/InputManualModal";

export default function PatientSpirometryPage(): React.JSX.Element {

  const patientID = 100000001;
  const screenWidth = Dimensions.get('window').width;
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [changeDeviceModalVisible, setChangeDeviceModalVisible] =
    useState(false);
  const [loadingModalVisible, setLoadingModalVisible] =
    useState(false);
  const [inputFEV1, setInputFEV1] = useState('');
  const [inputFEV1_FVC, setInputFEV1_FVC] = useState('');
  const FEV1_FVCRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const FEV1Regex = /^-?(\d+|\.\d+|\d*\.\d+)$/; // TODO: Fix to be 12.12
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [addFailedVisible, setAddFailedVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [spirometryData, setSpirometryData] = useState<any[][]>([]);

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
            inputTitles={[
              'FEV1',
              'FEV1/FVC',
            ]}
            modalTitle={'Add Blood Pressure'}
            modalUnit={['L', '%']}
            numberRegex={[FEV1Regex, FEV1_FVCRegex]}
            setInput={[setInputFEV1, setInputFEV1_FVC]}
          />
        }
        addButtonFunction={() => {
          // return addBloodPressureOnClick(
          //   inputSystolic,
          //   inputDiastolic,
          //   numberRegex,
          //   patientID,
          //   setModalVisible,
          //   modalVisible,
          //   setAddSuccessVisible,
          //   setAddFailedVisible,
          //   setStopDateTime,
          //   setInputDiastolic,
          //   setInputSystolic,
          // );
        }}
      />


    </View>
  )
}
