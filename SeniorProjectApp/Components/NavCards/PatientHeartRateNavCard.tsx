import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';
import SingleLineChart from '../SingleLineChart';
import {getHeartRate, getRecentHeartRate} from '../../BackEndFunctionCall/heartRateFunction';
import {
  getRecentWeight,
  getWeightCall,
} from '../../BackEndFunctionCall/weightFunction';

const patientID = 100000001;
export default function PatientHeartRateNavCard(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [heartRateData, setHeartRateData] = useState(null);
  const [trend, setTrend] = useState('UP');
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [recentHeartRate, setRecentHeartRate] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    getHeartRate(patientID, startDateTime, stopDateTime).then(res => {
      setHeartRateData(res);
    });
    getAccessibilityMode(patientID).then(res => {
      setAccessibilityMode(res[0].IfAccessibilityMode);
    });
    getRecentHeartRate(patientID).then(res => setRecentHeartRate(res[0].HeartRateInBPM));

  }, [isFocused]);

  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Heart Rate</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.value}>{recentHeartRate}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>Heart Rate: {recentHeartRate}</Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <SingleLineChart
            data={heartRateData}
            unit={'lb'}
            width={260}
            height={140}
          />
        </View>
      </View>
    );
  }
}
