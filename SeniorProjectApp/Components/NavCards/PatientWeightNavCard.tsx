import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SingleLineChart from '../SingleLineChart';
import {
  getWeightCall,
  getRecentWeight,
} from '../../BackEndFunctionCall/weightFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getAccessibilityMode} from '../../BackEndFunctionCall/settingsPageFunctions';
import {defaultStyle, accessStyle} from './navStyle';
import {useIsFocused} from '@react-navigation/native';

export default function PatientWeightNavCard(): JSX.Element {
  // This is done since there everytime the page is reloaded (any change) all the states are refreshed, so we do not want to call this function repeatedly if we do not need to.
  const defaultStartTime: string = getDefaultStartTime();
  const initialStartTime: string = new Date().toISOString();

  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [weightData, setWeightData] = useState<any[][]>([]);
  const [stopDateTime, setStopDateTime] = useState(initialStartTime);
  const [startDateTime, setStartDateTime] = useState(defaultStartTime);
  const patientID: number = 100000001;
  const [recentWeight, setRecentWeight] = useState('Loading');
  const isFocused = useIsFocused();
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;

  useEffect(() => {
    // Updating Date to get any added data.
    let tmpDate = new Date();
    // Adding 1 minute to current Date to deal with not loading data that was just added.
    tmpDate.setMinutes(tmpDate.getMinutes() + 1);
    setStopDateTime(tmpDate.toISOString());
    getWeightCall(patientID, startDateTime, stopDateTime).then(res => {
      setWeightData(res);
    });
    getAccessibilityMode()
      .then(res => {
        setAccessibilityMode(res);
      })
      .catch(res => {
        setAccessibilityMode(res);
      });
    setRecentWeight(getRecentWeight(weightData));
    // TODO: Look into using useReducer() and Reducers later to prevent infinite loop if all states are in dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
          />
        </View>
      </View>
    );
  }
}
