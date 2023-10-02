import {LineChart} from 'react-native-chart-kit';

import {View} from 'react-native';
import { Dimensions } from "react-native";
import {getWeightCall} from "../BackEndFunctionCall/weightFunction";
import getDefaultStartTime, {getNDaysAgo} from "../BackEndFunctionCall/getDefaultStartTime";
import getDefaultHeaderHeight from "react-native-screens/lib/typescript/native-stack/utils/getDefaultHeaderHeight";
import {useState, useEffect} from "react";


export default function WeightLineChart({data}): JSX.Element {

  const screenWidth = Dimensions.get('window').width;
  const sample: number[] = [100, 120, 125, 110, 129, 122, 124];


  const dates: string[] = [];
  let date: Date = new Date();
  date.setDate(date.getDate() - 7);
  for (let i = 0; i < 7; i++) {
    let dateString: string = '';
    dateString += new Date(date).toISOString().split('T')[0].split('-')[1];
    dateString += '.';
    dateString += new Date(date).toISOString().split('T')[0].split('-')[2];
    dates.push(dateString);
    date.setDate(date.getDate() + 1);
  }

  const lineChart = (
    <LineChart
      data={{
        labels: dates,
        datasets: [
          {
            data: sample,
          },
        ],
      }}
      width={screenWidth * 0.95} // from react-native
      height={170}
      yAxisSuffix="lb"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: '#BA4618',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 10,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 10,
      }}
    />
  );

  return <View>{lineChart}</View>;
}
