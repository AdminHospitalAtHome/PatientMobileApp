/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {AddWeight} from '../BackEndFunctionCall/AddWeight';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import getCurrentDateTime from '../BackEndFunctionCall/getCurrentDateAndTime';
import * as querystring from 'querystring';

it('renders correctly', () => {
  renderer.create(<App />);
});
