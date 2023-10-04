import {LineChart} from 'react-native-chart-kit';

import {View} from 'react-native';
import {Dimensions} from 'react-native';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

export default function WeightLineChart({data, unit}: {data: [][], unit: string}): JSX.Element {
  const screenWidth = Dimensions.get('window').width;
  const chartData: number[] = [];

  if (data) {
    data.forEach((i):void => {
      chartData.push(i[1]);
    });

    return (
      <LineChart
        data={{
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={screenWidth * 0.95} // from react-native
        height={170}
        yAxisSuffix= {unit}
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
  }
  else{
    return <View />;
  }
}
