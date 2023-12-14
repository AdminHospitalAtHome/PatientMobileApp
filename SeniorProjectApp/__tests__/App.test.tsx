/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {it, expect, jest} from '@jest/globals';
import renderer from 'react-test-renderer';
import window from '../__mocks__/window';
// import window from
// jest.mock('@azure/communication-common');
// jest.mock('@azure/communication-chat');
// jest.spyOn(window.Navigator, 'userAgent');
// jest.mock('node-libs-react-native/mock/net');
// jest.mock('node-libs-react-native/mock/tls');

jest.mock('node-libs-react-native/global', () =>
  require('node-libs-react-native/mock/net'),
);
it('renders correctly', () => {
  renderer.create(<App />);
});
