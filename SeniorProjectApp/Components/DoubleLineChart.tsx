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
              color: opacity => `rgba(0,0,0, ${0.7})`,
              strokeWidth: 3,
            },
            {
              data: chartData2,
              color: opacity => `rgba(0, 0, 0, ${0.5})`,
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

          backgroundGradientFrom: '#f5f7fa',
          backgroundGradientTo: '#c3cfe2',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 10,
            paddingRight: 20, // Add some padding to the right
            paddingLeft: 20,
          },
          propsForLabels:{
            fontSize: 10,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier={false}
        withShadow={false}
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    );
  } else {
    return <View />;
  }
}
