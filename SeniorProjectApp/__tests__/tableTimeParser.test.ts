import {it, expect} from '@jest/globals';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

it('Formats Time Correctly', () => {
  expect(timeTableParser('2023-01-02T08:03:04.000')).toBe(
    '01-02-2023\n8:03 AM',
  );
  expect(timeTableParser('2023-01-02T13:03:04.000')).toBe(
    '01-02-2023\n1:03 PM',
  );
  expect(timeTableParser('2023-01-02T00:03:04.000')).toBe(
    '01-02-2023\n12:03 AM',
  );
});
