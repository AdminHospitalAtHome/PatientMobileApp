/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {addBloodOxygen} from '../BackEndFunctionCall/bloodOxygenFunction';

// Add Blood Pressure test
it('Add Blood Oxygen Test', () => {
  addBloodOxygen(3, 98, true).then(output => {
    expect(output).toBe('add successful');
  });
});
