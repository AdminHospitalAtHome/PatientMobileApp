import {forEach} from 'react-bootstrap/ElementChildren';

export default function getDayAverage(dataArray: number[]): number {
  let sum: number = 0;
  dataArray.forEach(data => {
    sum += data;
  });
  return sum / dataArray.length;
}
