import {LineChart} from 'react-native-chart-kit';

import {View} from 'react-native';
import { Dimensions } from "react-native";
import {getWeightCall} from "../BackEndFunctionCall/weightFunction";
import getDefaultStartTime, {getNDaysAgo} from "../BackEndFunctionCall/getDefaultStartTime";


export default function WeightLineChart(): JSX.Element {
  const screenWidth = Dimensions.get('window').width;
  const sample: number[] = [100, 120, 125, 110, 129];
  const data: number[] = [];

  let i: number = 7;



  const lineChart = (
    <LineChart
      data={{
        labels: ['9.26', '9.27', '9.28', '9.29', '9.30'],
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
