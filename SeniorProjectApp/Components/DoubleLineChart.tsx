import {LineChart} from 'react-native-chart-kit';

import {View} from 'react-native';
import {Dimensions} from 'react-native';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

export default function DoubleLineChart({
  data,
  unit,
  width,
  height,
}: {
  data: any;
  unit: string;
  width: number;
  height: number;
}): JSX.Element {
  const chartData1: number[] = [];
  const chartData2: number[] = [];

  if (data) {
    data.forEach((i): void => {
      chartData1.push(i[1]);
      chartData2.push(i[2]);
    });

    return (
      <LineChart
        data={{
          datasets: [
            {
              data: chartData1,
              color: (opacity) => `rgba(255,255,255, ${0.7})`,
              strokeWidth: 3,
            },
            {data: chartData2,
              color: (opacity) => `rgba(255, 255, 25, ${0.5})`,
              strokeWidth: 3,
            },
          ],
        }}
        width={width}
        height={height}
        yAxisSuffix={unit}
        yAxisInterval={1} // optional, defaults to 1
          withDots={false}
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
        }}></LineChart>
    );
  } else {
    return <View />;
  }
}
