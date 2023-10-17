import 'react-native';

import {it, expect} from '@jest/globals';

import {
  HAH_Device_Connection,
  HAH_Device,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {
  MedMDevice,
  MedMDeviceConnection,
  parseXMLBloodOxygenData,
  parseXMLBloodPressureData,
  parseXMLHeartRateData,
  parseXMLWeightData,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

it('Test register license key', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();

  await expect(
    connection.register('Insert License Key Here'),
  ).resolves.toBeUndefined();

  await expect(
    connection.register('Invalid License Key'),
  ).rejects.toBeUndefined();
});

it('Test List Pairable Devices', () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  connection.register('Insert License Key Here');
  //TODO: Update once we know information for our devices
  let deviceList: HAH_Device[] = [
    new MedMDevice('Address', 1, 'Omron', 'HN-290T', 'Omron HN-290T'),
    new MedMDevice('Address 2', 2, 'Omron', 'HEM-9200T', 'Omron HEM-9200T'),
    new MedMDevice('Address 3', 3, 'Contec', 'PM10', 'Contec PM10'),
    new MedMDevice(
      'Address 4',
      4,
      'Nonin Medical',
      'The Wrist Ox2 3150',
      'Nonin Medical The Wrist Ox2 3150',
    ),
    new MedMDevice(
      'Address 5',
      5,
      'MIR',
      'Spirobank Smart',
      'MIR Spirobank Smart',
    ),
  ];

  expect(connection.pairable_device_list()).toStrictEqual(deviceList);
});

it('Test List Paried Devices', () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  connection.register('Insert License Key Here');
  //TODO: Update once we know information for our devices
  let deviceList: HAH_Device[] = [
    new MedMDevice('Address', 1, 'Omron', 'HN-290T', 'Omron HN-290T'),
    new MedMDevice('Address 2', 2, 'Omron', 'HEM-9200T', 'Omron HEM-9200T'),
    new MedMDevice('Address 3', 3, 'Contec', 'PM10', 'Contec PM10'),
    new MedMDevice(
      'Address 4',
      4,
      'Nonin Medical',
      'The Wrist Ox2 3150',
      'Nonin Medical The Wrist Ox2 3150',
    ),
    new MedMDevice(
      'Address 5',
      5,
      'MIR',
      'Spirobank Smart',
      'MIR Spirobank Smart',
    ),
  ];

  expect(connection.paired_device_list()).toStrictEqual(deviceList);
});

it('Test Pairing a Device', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  connection.register('Insert License Key Here');

  // TODO: update Address and ID
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address',
    1,
    'Omron',
    'HN-290T',
    'Omron HN-290T',
  );
  // Test Pairing to good Device
  await expect(
    connection.pair_device(sampleGoodDevice),
  ).resolves.toBeUndefined();

  let sampleBadDevice: HAH_Device = new MedMDevice(
    'Bad Address',
    9999,
    'Omron',
    'HN-290T',
    'Omron HN-290T',
  );

  // Test Pairing to non-exist Device
  await expect(connection.pair_device(sampleBadDevice)).rejects.toBeUndefined();
});

it('Test Unpairing a Device', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  connection.register('Insert License Key Here');

  // TODO: update Address and ID
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address',
    1,
    'Omron',
    'HN-290T',
    'Omron HN-290T',
  );

  await connection.pair_device(sampleGoodDevice);
  // Test Unpairing to good Device
  await expect(
    connection.unpair_device(sampleGoodDevice),
  ).resolves.toBeUndefined();

  let sampleBadDevice: HAH_Device = new MedMDevice(
    'Bad Address',
    9999,
    'Omron',
    'HN-290T',
    'Omron HN-290T',
  );

  // Test Unpairing to non-exist Device
  await expect(
    connection.unpair_device(sampleBadDevice),
  ).rejects.toBeUndefined();
});

it('Test Parsing XML Weight Data', () => {
  let exampleXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-weight>\n' +
    '  <id>1553d4d9-76b1-48ba-8051-d9699aaab882</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-14T14:38:16.000000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-14T07:38:16.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-14T14:38:18.000000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-14T07:38:18.000000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <value>78.6</value>\n' +
    '  <units>kg</units>\n' +
    '  <value-in-metric>78.6</value-in-metric>\n' +
    '  <value-in-us>173.3</value-in-us>\n' +
    '  <bc-fat-percent>18.8</bc-fat-percent>\n' +
    '  <bc-muscle-weight>60.7</bc-muscle-weight>\n' +
    '  <bc-water-percent>57.8</bc-water-percent>\n' +
    '  <bc-bones-weight>3.2</bc-bones-weight>\n' +
    '  <bc-amr>2883</bc-amr>\n' +
    '  <bc-metabolic-age>31</bc-metabolic-age>\n' +
    '  <bc-overall-rating>5</bc-overall-rating>\n' +
    '  <bcp-user-number>1</bcp-user-number>\n' +
    '  <bcp-height-in-mm>1700</bcp-height-in-mm>\n' +
    '  <bcp-age>34</bcp-age>\n' +
    '  <bcp-activity-level>1</bcp-activity-level>\n' +
    '  <bcp-gender>male</bcp-gender>\n' +
    '</measurements-weight>';

  expect(parseXMLWeightData(exampleXML)).toStrictEqual([
    {WeightInPounds: 173, DateTimeTaken: '2019-08-14 07:38:16.000'},
  ]);
});

it('Test Getting Weight Data', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  await connection.register('Insert License Key Here');
  // TODO: update Address and ID
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address',
    1,
    'Omron',
    'HN-290T',
    'Omron HN-290T',
  );

  await connection.pair_device(sampleGoodDevice);
  await expect(
    connection.get_data(1, parseXMLWeightData),
  ).resolves.toStrictEqual([
    {
      WeightInPounds: 200,
      DateTimeTaken: '2023-01-02 08:00:00.000',
    },
    {
      WeightInPounds: 201,
      DateTimeTaken: '2023-01-01 08:00:00.000',
    },
  ]);
});

it('Test Getting Heart Rate Data', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  await connection.register('Insert License Key Here');

  // TODO: update Address and ID
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address 2',
    2,
    'Omron',
    'HEM-9200T',
    'Omron HEM-9200T',
  );

  await connection.pair_device(sampleGoodDevice);
  await expect(
    connection.get_data(1, parseXMLHeartRateData),
  ).resolves.toStrictEqual([
    {
      HeartRateInBPM: 100,
      DateTimeTaken: '2023-01-02 08:00:00.000',
    },
    {
      HeartRateInBPM: 150,
      DateTimeTaken: '2023-01-01 08:00:00.000',
    },
  ]);
});

it('Test Getting Blood Pressure Data', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  await connection.register('Insert License Key Here');

  // TODO: update Address and ID
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address 2',
    2,
    'Omron',
    'HEM-9200T',
    'Omron HEM-9200T',
  );

  await connection.pair_device(sampleGoodDevice);
  await expect(
    connection.get_data(1, parseXMLBloodPressureData),
  ).resolves.toStrictEqual([
    {
      SystolicBloodPressureInmmHg: 120,
      DiastolicBloodPressureInmmHg: 80,
      DateTimeTaken: '2023-01-02 08:00:00.000',
    },
    {
      SystolicBloodPressureInmmHg: 130,
      DiastolicBloodPressureInmmHg: 70,
      DateTimeTaken: '2023-01-01 08:00:00.000',
    },
  ]);
});

it('Test Getting Blood Oxygen Data', async () => {
  let connection: HAH_Device_Connection = new MedMDeviceConnection();
  //TODO: update License Key
  await connection.register('Insert License Key Here');
  let sampleGoodDevice: HAH_Device = new MedMDevice(
    'Address 4',
    4,
    'Nonin Medical',
    'The Wrist Ox2 3150',
    'Nonin Medical The Wrist Ox2 3150',
  );

  await connection.pair_device(sampleGoodDevice);
  await expect(
    connection.get_data(1, parseXMLBloodOxygenData),
  ).resolves.toStrictEqual([
    {
      BloodOxygenInPercentage: 98,
      DateTimeTaken: '2023-01-02 08:00:00.000',
    },
    {
      BloodOxygenInPercentage: 97,
      DateTimeTaken: '2023-01-01 08:00:00.000',
    },
  ]);
});
