import {jest} from '@jest/globals';
import {NativeModules} from 'react-native';

// This is for mocking the MedMDeviceManager, the Java code, that is not accessible when testing because we are not running on a phone. To bypass this the functions are created here as mocks.
// If additional functions are added to the Java code that are callable by react-native, they need to be added here or tests could crash.
NativeModules.MedMDeviceManager = {
  init: jest.fn(), // Since init does not do anything from the perspective of the React-Native side, it is ok for this to be blank
  startDeviceScan: jest.fn(),
  stopDeviceScan: jest.fn(),
  pairableDeviceList: jest
    .fn()
    .mockImplementation(() => {
      return new Promise<string>(resolve => {
        resolve(
          '[{"address": "34:81:F4:D4:8C:A1" , "id": "20210101522F", "manufacturer": "Omron" , "model": "null" , "name": "BLEsmart_000101053481F4D48CA1" , "modelName": "Omron HN-290T" , "measurementTypes": ["Weight"]},{"address": "B0:49:5F:08:6C:71" , "id": "20200607031A", "manufacturer": "Omron" , "model": "null" , "name": "BLEsmart_00000116B0495F086C71" , "modelName": "Omron HEM-9200T/9210T" , "measurementTypes": ["BloodPressure"]}]',
        );
      });
    })
    .mockImplementationOnce(() => {
      return new Promise<string>(resolve => {
        resolve('[]');
      });
    }),
  getPairedDevices: jest
    .fn()
    .mockImplementation(() => {
      return new Promise<string>(resolve => {
        resolve(
          '[{"address": "34:81:F4:D4:8C:A1" , "id": "20210101522F", "manufacturer": "Omron" , "model": "null" , "name": "BLEsmart_000101053481F4D48CA1" , "modelName": "Omron HN-290T" , "measurementTypes": ["Weight"]},{"address": "B0:49:5F:08:6C:71" , "id": "20200607031A", "manufacturer": "Omron" , "model": "null" , "name": "BLEsmart_00000116B0495F086C71" , "modelName": "Omron HEM-9200T/9210T" , "measurementTypes": ["BloodPressure"]}]',
        );
      });
    })
    .mockImplementationOnce(() => {
      return new Promise<string>(resolve => {
        resolve('[]');
      });
    }),
  getDeviceByAddress: jest.fn(),
  pairDevice: jest.fn(),
  setDeviceFilter: jest.fn(),
  startCollector: jest.fn(),
  manualStopCollector: jest.fn(),
};
