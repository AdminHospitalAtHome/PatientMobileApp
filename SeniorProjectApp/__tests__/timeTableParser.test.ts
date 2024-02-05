import {it, expect} from '@jest/globals';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

it('Formats Time Correctly', () => {
  expect(timeTableParser('2023-01-02T08:03:04.000')).toBe(
    '01-02-2023\n8:03 AM',
  );
});
