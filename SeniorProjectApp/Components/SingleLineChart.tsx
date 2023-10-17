import {LineChart} from 'react-native-chart-kit';

import {View} from 'react-native';
import {Dimensions} from 'react-native';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

export default function SingleLineChart({
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
  const screenWidth = Dimensions.get('window').width;
  const chartData: number[] = [];

  if (data) {
    data.forEach((i): void => {
      chartData.push(i[1]);
    });

    return (
      <LineChart
        data={{
          datasets: [
            {
              data: chartData,
              color: opacity => `rgba(255,255,255, ${0.7})`,
              strokeWidth: 2,
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
          useShadowColorFromDataset: false,
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
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
        bezier={false}
        withShadow={false}
      />
    );
  } else {
    return <View />;
  }
}
