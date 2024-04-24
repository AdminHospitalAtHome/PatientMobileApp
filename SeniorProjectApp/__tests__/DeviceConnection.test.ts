import 'react-native';

import {afterEach, expect, it, jest} from '@jest/globals';

import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {
  MedMDevice,
  MedMDeviceConnection,
  parseDevicesJson,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

afterEach(() => {
  jest.clearAllMocks();
});

it('Test List Pairable Devices', async () => {
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

  let deviceList: HAH_Device[] = [
    new MedMDevice(
      '34:81:F4:D4:8C:A1',
      '20210101522F',
      'Omron',
      'null',
      'Omron HN-290T',
      'BLEsmart_000101053481F4D48CA1',
      [VitalType.WEIGHT],
    ),
    new MedMDevice(
      'B0:49:5F:08:6C:71',
      '20200607031A',
      'Omron',
      'null',
      'Omron HEM-9200T/9210T',
      'BLEsmart_00000116B0495F086C71',
      [VitalType.BLOOD_PRESSURE],
    ),
  ];

  // Test Empty
  await expect(connection.pairable_device_list()).resolves.toStrictEqual([]);
  // Test with Devices
  await expect(connection.pairable_device_list()).resolves.toStrictEqual(
    deviceList,
  );
});

it('Test List Paired Devices', async () => {
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

  let deviceList: HAH_Device[] = [
    new MedMDevice(
      '34:81:F4:D4:8C:A1',
      '20210101522F',
      'Omron',
      'null',
      'Omron HN-290T',
      'BLEsmart_000101053481F4D48CA1',
      [VitalType.WEIGHT],
    ),
    new MedMDevice(
      'B0:49:5F:08:6C:71',
      '20200607031A',
      'Omron',
      'null',
      'Omron HEM-9200T/9210T',
      'BLEsmart_00000116B0495F086C71',
      [VitalType.BLOOD_PRESSURE],
    ),
  ];
  // Test with Devices
  await expect(connection.paired_device_list()).resolves.toStrictEqual(
    deviceList,
  );
});

it('Test Set Default Device', async () => {
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  await connection
    .setDefaultDevice('34:81:F4:D4:8C:A1', VitalType.WEIGHT)
    .then(() => {
      // There is probably a better way to do this, but if we get here, we consider it a success...
      expect('Success').toBe('Success');
    })
    .catch(() => {
      // There is probably a better way to do this, but if we get here, we consider it a failure...
      expect('Failed').toBe('Success');
    });

  const device: HAH_Device = new MedMDevice(
    '34:81:F4:D4:8C:A1',
    '20210101522F',
    'Omron',
    'null',
    'Omron HN-290T',
    'BLEsmart_000101053481F4D48CA1',
    [VitalType.WEIGHT],
  );
  await expect(
    connection.default_paried_device(VitalType.WEIGHT),
  ).resolves.toStrictEqual(device);
});

it('Test Get Default Device failure', async () => {
  // Test Getting a default device when no default is set...
  await expect(
    MedMDeviceConnection.getInstance().default_paried_device(
      VitalType.BLOOD_OXYGEN,
    ),
  ).rejects.toBeNull();

  await MedMDeviceConnection.getInstance().setDefaultDevice(
    'B0:49:5F:08:6C:74',
    VitalType.BLOOD_PRESSURE,
  );

  await expect(
    MedMDeviceConnection.getInstance().default_paried_device(
      VitalType.BLOOD_PRESSURE,
    ),
  ).rejects.toBeNull();
});

it('Test Start and Stop Device Scan', () => {
  // First Test that it clears devices correctly when done...
  let testDevices: any[] = ['hello'];
  let fakeStateFunction: any = (parsedDevices: HAH_Device[]) => {
    testDevices = parsedDevices;
  };

  MedMDeviceConnection.getInstance().startDeviceScan(fakeStateFunction);

  MedMDeviceConnection.getInstance().stopDeviceScan(fakeStateFunction);
  expect(testDevices).toStrictEqual([]);
  let device1: HAH_Device = new MedMDevice(
    'F6:60:4C:E1:E7:74',
    'null',
    'MIR',
    'null',
    'MIR Spirobank Smart',
    'SM-009-Z121980',
    [VitalType.SPIROMETRY],
  );
  expect(
    parseDevicesJson(
      '[' +
        '  {' +
        '    "address": "F6:60:4C:E1:E7:74",' +
        '    "id": "null",' +
        '    "manufacturer": "MIR",' +
        '    "model": "null",' +
        '    "modelName": "MIR Spirobank Smart",' +
        '    "name": "SM-009-Z121980",' +
        '    "measurementTypes": [' +
        '      "Spirometry"' +
        '    ]' +
        '  }' +
        ']',
    ),
  ).toStrictEqual([device1]);
});

it('Get Paired Devices by Vital', async () => {
  await expect(
    MedMDeviceConnection.getInstance().paired_device_list_vital(
      VitalType.SLEEP,
    ),
  ).resolves.toStrictEqual([]);

  const sampleDevice: HAH_Device = new MedMDevice(
    '34:81:F4:D4:8C:A1',
    '20210101522F',
    'Omron',
    'null',
    'Omron HN-290T',
    'BLEsmart_000101053481F4D48CA1',
    [VitalType.WEIGHT],
  );
  await expect(
    MedMDeviceConnection.getInstance().paired_device_list_vital(
      VitalType.WEIGHT,
    ),
  ).resolves.toStrictEqual([sampleDevice]);
});
