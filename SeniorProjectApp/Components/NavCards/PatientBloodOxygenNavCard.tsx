import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SingleLineChart from '../SingleLineChart';
import {
  getBloodOxygen,
  getRecentBloodOxygen,
} from '../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/settingsPageFunctions';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';

export default function PatientBloodOxygenNavCard(): React.JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState<any[][]>([]);
  const [stopDateTime] = useState(new Date().toISOString());
  const [startDateTime] = useState(getDefaultStartTime());
  const patientID: number = 100000001;
  const [recentBloodOxygen, setRecentBloodOxygen] = useState('Loading');
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;
  const isFocused = useIsFocused();

  useEffect(() => {
    getBloodOxygen(patientID, startDateTime, stopDateTime).then(res => {
      setBloodOxygenData(res);
    });
    getAccessibilityMode()
      .then(res => {
        setAccessibilityMode(res);
      }) // TODO: Check that the catch is always returning a boolean
      .catch(res => {
        setAccessibilityMode(res);
      });
    getRecentBloodOxygen(patientID).then(res => setRecentBloodOxygen(res));
  }, [isFocused]);

  if (accessibilityMode) {
    return (
      <View style={accessStyle.container}>
        <View style={accessStyle.labelHolder}>
          <Text style={accessStyle.label}>Blood Oxygen</Text>
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
          <Text style={defaultStyle.label}>
            Blood Oxygen: {recentBloodOxygen}
          </Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <SingleLineChart
            data={bloodOxygenData}
            unit={'%'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
            decimalPlaces={0}
          />
        </View>
      </View>
    );
  }
}
