import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {defaultStyle, accessStyle} from './navStyle';
import {getBloodPressure} from '../../BackEndFunctionCall/bloodPressureFunction';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {useIsFocused} from '@react-navigation/native';
import WeightLineChart from '../WeightLineChart';

const patientID = 300000001;
export default function PatientBloodPressureNavCard(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [bloodPresureData, setBloodPresure] = useState(null);
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [recentBloodPressure, setRecentBloodPressure] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    getBloodPressure(patientID, startDateTime, stopDateTime).then(res => {
      setBloodPresure(res);
    });
    getAccessibilityMode(patientID).then(res => {
      setAccessibilityMode(res[0].IfAccessibilityMode);
    });
  }, [isFocused]);

  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Blood Pressure</Text>
          <Text style={accessStyle.label}>UP</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.value}>{recentBloodPressure}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>Blood Pressure: {recentBloodPressure}</Text>
          <Text style={defaultStyle.label}>UP</Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <WeightLineChart
            data={bloodPresureData}
            unit={'lb'}
            width={260}
            height={140}
          />
        </View>
      </View>
    );
  }
}
