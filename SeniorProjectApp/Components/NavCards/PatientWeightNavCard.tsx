import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import SingleLineChart from '../SingleLineChart';
import {
  getWeightCall,
  getRecentWeight,
} from '../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';

export default function PatientWeightNavCard(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [weightData, setWeightData] = useState(null);
  const [trend, setTrend] = useState('UP');
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const patientID: number = 100000001;
  const [recentWeight, setRecentWeight] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(res => {
      setWeightData(res);
    });
    getAccessibilityMode(patientID).then(res => {
      setAccessibilityMode(res[0].IfAccessibilityMode);
    });
    getRecentWeight(patientID).then(res =>
      setRecentWeight(res[0]),
    );
  }, [isFocused]);


  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Weight</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.value}>{recentWeight}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>Weight: {recentWeight}</Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <SingleLineChart
            data={weightData}
            unit={'lb'}
            width={260}
            height={140}
          />
        </View>
      </View>
    );
  }
}
