import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import WeightLineChart from '../WeightLineChart';
import {getBloodOxygen} from '../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';
import {
  getRecentWeight,
  getWeightCall,
} from '../../BackEndFunctionCall/weightFunction';
export default function PatientBloodOxygenNavCard(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState(null);
  const [trend, setTrend] = useState('UP');
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const patientID: number = 300000001;
  const [recentBloodOxygen, setRecentBloodOxygen] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(res => {
      setBloodOxygenData(res);
    });
    getAccessibilityMode(patientID).then(res => {
      setAccessibilityMode(res[0].IfAccessibilityMode);
    });
    getRecentWeight(patientID).then(res =>
      setRecentBloodOxygen(res[0].WeightInPounds),
    );
  }, [isFocused]);

  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Blood Oxygen</Text>
          <Text style={accessStyle.label}>UP</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.value}>{recentBloodOxygen}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>Blood Oxygen: {recentBloodOxygen}</Text>
          <Text style={defaultStyle.label}>UP</Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <WeightLineChart
            data={bloodOxygenData}
            unit={'lb'}
            width={260}
            height={140}
          />
        </View>
      </View>
    );
  }
}
