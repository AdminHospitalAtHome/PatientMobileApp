import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {defaultStyle, accessStyle} from './navStyle';
import {
  getBloodPressure,
  getRecentBloodPressure,
} from '../../BackEndFunctionCall/bloodPressureFunction';
import {getAccessibilityMode} from '../../BackEndFunctionCall/settingsPageFunctions';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {useIsFocused} from '@react-navigation/native';
import DoubleLineChart from '../DoubleLineChart';

const patientID = 100000001;
export default function PatientBloodPressureNavCard(): React.JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [bloodPressureData, setBloodPressureData] = useState<any[][]>([]);
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const startDateTime = getDefaultStartTime();
  const [recentSystolicBloodPressure, setRecentSystolicBloodPressure] =
    useState('loading');
  const [recentDiastolicBloodPressure, setRecentDiastolicBloodPressure] =
    useState('loading');
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;
  const isFocused = useIsFocused();

  useEffect(() => {
    let tmpDate = new Date();
    // Adding 1 minute to current Date to deal with not loading data that was just added.
    tmpDate.setMinutes(tmpDate.getMinutes() + 1);
    setStopDateTime(tmpDate.toISOString());
    getBloodPressure(patientID, startDateTime, stopDateTime).then(res => {
      setBloodPressureData(res);
      setRecentSystolicBloodPressure(getRecentBloodPressure(res, 'Systolic'));
      setRecentDiastolicBloodPressure(getRecentBloodPressure(res, 'Diastolic'));
    });
    getAccessibilityMode()
      .then(res => {
        setAccessibilityMode(res);
      })
      .catch(res => {
        if (typeof res === 'boolean') {
          setAccessibilityMode(res);
        } else {
          setAccessibilityMode(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* eslint-disable-next-line prettier/prettier */}
            Blood Pressure: {recentSystolicBloodPressure + ' / ' + recentDiastolicBloodPressure}
          </Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <DoubleLineChart
            data={bloodPressureData}
            unit={'mmHg'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
          />
        </View>
      </View>
    );
  }
}
