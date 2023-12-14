import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/settingsPageFunctions';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';
import SingleLineChart from '../SingleLineChart';
import {
  getHeartRate,
  getRecentHeartRate,
} from '../../BackEndFunctionCall/heartRateFunction';
const patientID = 100000001;

export default function PatientHeartRateNavCard(): React.JSX.Element {
  const initialStartTime: string = new Date().toISOString();

  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [heartRateData, setHeartRateData] = useState<any[][]>([]);
  const [stopDateTime, setStopDateTime] = useState(initialStartTime);
  const startDateTime = getDefaultStartTime();
  const [recentHeartRate, setRecentHeartRate] = useState('Loading');
  const isFocused = useIsFocused();
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;

  useEffect(() => {
    let tmpDate = new Date();
    // Adding 1 minute to current Date to deal with not loading data that was just added.
    tmpDate.setMinutes(tmpDate.getMinutes() + 1);
    setStopDateTime(tmpDate.toISOString());
    getHeartRate(patientID, startDateTime, stopDateTime).then(res => {
      setHeartRateData(res);
      setRecentHeartRate(getRecentHeartRate(res));
    });
    getAccessibilityMode()
      .then(res => {
        setAccessibilityMode(res);
      })
      .catch(res => {
        setAccessibilityMode(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            unit={'BPM'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
          />
        </View>
      </View>
    );
  }
}
