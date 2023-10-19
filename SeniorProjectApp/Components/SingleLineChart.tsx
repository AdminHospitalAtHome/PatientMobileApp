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
              color: () => 'black',
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
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black label color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 10,

          },

          propsForLabels:{
            // fontSize: Dimensions.get('screen').width / 30,
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
