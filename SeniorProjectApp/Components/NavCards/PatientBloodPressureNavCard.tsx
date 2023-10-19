import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {defaultStyle, accessStyle} from './navStyle';
import {
  getBloodPressure,
  getRecentBloodPressure,
} from '../../BackEndFunctionCall/bloodPressureFunction';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {useIsFocused} from '@react-navigation/native';
import SingleLineChart from '../SingleLineChart';
import DoubleLineChart from '../DoubleLineChart';

const patientID = 100000001;
export default function PatientBloodPressureNavCard(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [bloodPresureData, setBloodPresureData] = useState(null);
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [recentSystolicBloodPressure, setRecentSystolicBloodPressure] =
    useState(null);
  const [recentDiastolicBloodPressure, setRecentDiastolicBloodPressure] =
    useState(null);
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;
  const isFocused = useIsFocused();

  useEffect(() => {
    getBloodPressure(patientID, startDateTime, stopDateTime).then(res => {
      setBloodPresureData(res);
    });
    getAccessibilityMode(patientID).then(res => {
      setAccessibilityMode(res[0].IfAccessibilityMode);
    });
    getRecentBloodPressure(patientID).then(res => {
      setRecentSystolicBloodPressure(res[0]);
      setRecentDiastolicBloodPressure(res[1]);
    });
  }, [isFocused]);

  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Blood Pressure</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.text}>
            Systolic {recentSystolicBloodPressure}
          </Text>
          <Text style={accessStyle.text}>
            Diastolic {recentDiastolicBloodPressure}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>
            Blood Pressure: {recentSystolicBloodPressure}
          </Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <DoubleLineChart
            data={bloodPresureData}
            unit={'mmHg'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
          />
        </View>
      </View>
    );
  }
}
