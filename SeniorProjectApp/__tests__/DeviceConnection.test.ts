import 'react-native';

import {it, expect, resolves} from '@jest/globals';

import {
  HAH_Device_Connection,
  HAH_Device,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

it('Test register license key', () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();

  expect(connection.register('Insert License Key Here').resolves);
});
