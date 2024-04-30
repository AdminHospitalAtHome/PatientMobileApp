import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SingleLineChart from '../Charts/SingleLineChart';
import {accessStyle, defaultStyle} from './navStyle';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {useIsFocused} from '@react-navigation/native';
import {
  getRecentSpirometry,
  getSpirometry,
  parseSpirometryForChart,
} from '../../BackEndFunctionCall/spirometryFunction';
import {getAccessibilityMode} from '../../BackEndFunctionCall/settingsPageFunctions';

export default function PatientSpirometryNavCard(): React.JSX.Element {
  // This is done since there everytime the page is reloaded (any change) all the states are refreshed, so we do not want to call this function repeatedly if we do not need to.
  const initialStartTime: string = new Date().toISOString();

  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [spirometryData, setSpirometryData] = useState<any[][]>([]);
  const [stopDateTime, setStopDateTime] = useState(initialStartTime);
  const startDateTime = getDefaultStartTime();
  const patientID: number = 100000001;
  const [recentSpirometryFEV1, setRecentSpirometryFEV1] = useState('Loading');
  const isFocused = useIsFocused();
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;

  useEffect(() => {
    // Updating Date to get any added data.
    let tmpDate = new Date();
    // Adding 1 minute to current Date to deal with not loading data that was just added.
    tmpDate.setMinutes(tmpDate.getMinutes() + 1);
    setStopDateTime(tmpDate.toISOString());

    getSpirometry(patientID, startDateTime, stopDateTime).then(res => {
      setSpirometryData(res);
      setRecentSpirometryFEV1(getRecentSpirometry(res));
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
          <Text style={accessStyle.label}>Spirometry FEV1</Text>
        </View>
        <View style={accessStyle.textHolder}>
          <Text style={accessStyle.value}>{recentSpirometryFEV1}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.labelHolder}>
          <Text style={defaultStyle.label}>
            Spirometry FEV1: {recentSpirometryFEV1}
          </Text>
        </View>
        <View style={defaultStyle.chartHolder}>
          <SingleLineChart
            data={parseSpirometryForChart(spirometryData)}
            unit={'L'}
            width={windowWidth * 0.7}
            height={windowHeight * 0.18}
            decimalPlaces={2}
          />
        </View>
      </View>
    );
  }
}
