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

// it('Test register license key', async () => {
//   let connection: HAH_Device_Connection = new MedMDeviceConnection();
//
//   await expect(
//     connection.register('Insert License Key Here'),
//   ).resolves.toBeUndefined();
//
//   await expect(
//     connection.register('Invalid License Key'),
//   ).rejects.toBeUndefined();
// });

it('Test List Pairable Devices', () => {
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  //TODO: update License Key

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

it('Test Parsing XML Weight Data', async () => {
  let exampleGoodXML =
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

  await expect(parseXMLWeightData(exampleGoodXML)).resolves.toStrictEqual([
    {WeightInPounds: 173, DateTimeTaken: '2019-08-14T14:38:16.000Z'},
  ]);

  let exampleBadXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-weight>\n' +
    '  <id>1553d4d9-76b1-48ba-8051-d9699aaab882</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
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

  await expect(parseXMLWeightData(exampleBadXML)).rejects.toStrictEqual([{}]);

  let exampleBadXML2 =
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
    '  <value-in-us>173.3L</value-in-us>\n' +
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

  await expect(parseXMLWeightData(exampleBadXML2)).rejects.toStrictEqual([{}]);

  let exampleBadXML3 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-weight>\n' +
    '  <id>1553d4d9-76b1-48ba-8051-d9699aaab882</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-14T30:61:16.000000000+00:00</measured-at>\n' +
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

  await expect(parseXMLWeightData(exampleBadXML3)).rejects.toStrictEqual([{}]);
});

it('Test Parsing XML Heart Rate Data', async () => {
  let exampleGoodXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-heartrate-stream>\n' +
    '  <id>c451a714-b233-45e1-ab56-df212d4bce8c</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-07-14T23:16:40.404000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-07-14T16:16:40.404000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-07-14T23:16:40.404000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-07-14T16:16:40.404000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <measurement-duration>6002</measurement-duration>\n' +
    '  <pulse-last>102</pulse-last>\n' +
    '  <pulse-min>102</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-average>102</pulse-average>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>652bb758-cd2b-434e-838d-e8756d7e68ca</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>3003</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,2076],"pulse_quality":[255,2076]}}</heartrate>\n' +
    '    </chunk>\n' +
    '    <chunk>\n' +
    '      <id>d39e139a-01d1-454e-b2f4-c1f7020899e6</id>\n' +
    '      <position>1</position>\n' +
    '      <start>3003</start>\n' +
    '      <end>6002</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,48,102,1057,102,2083],"pulse_quality":[255,48,255,1057,255,2083]}}</heartrate>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-heartrate-stream>';

  await expect(parseXMLHeartRateData(exampleGoodXML)).resolves.toStrictEqual([
    {HeartRateInBPM: 102, DateTimeTaken: '2019-07-14T23:16:40.404Z'},
  ]);

  let exampleBadXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-heartrate-stream>\n' +
    '  <id>c451a714-b233-45e1-ab56-df212d4bce8c</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-07-14T23:16:40.404000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-07-14T16:16:40.404000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-07-14T23:16:40.404000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-07-14T16:16:40.404000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <measurement-duration>6002</measurement-duration>\n' +
    '  <pulse-last>102</pulse-last>\n' +
    '  <pulse-min>102</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>652bb758-cd2b-434e-838d-e8756d7e68ca</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>3003</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,2076],"pulse_quality":[255,2076]}}</heartrate>\n' +
    '    </chunk>\n' +
    '    <chunk>\n' +
    '      <id>d39e139a-01d1-454e-b2f4-c1f7020899e6</id>\n' +
    '      <position>1</position>\n' +
    '      <start>3003</start>\n' +
    '      <end>6002</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,48,102,1057,102,2083],"pulse_quality":[255,48,255,1057,255,2083]}}</heartrate>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-heartrate-stream>';

  await expect(parseXMLHeartRateData(exampleBadXML)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML2: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-heartrate-stream>\n' +
    '  <id>c451a714-b233-45e1-ab56-df212d4bce8c</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-07-14T23:16:40.404000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-07-14T16:16:40.404000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-07-14T23:16:40.404000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-07-14T16:16:40.404000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <measurement-duration>6002</measurement-duration>\n' +
    '  <pulse-last>102</pulse-last>\n' +
    '  <pulse-min>102</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-average>102L</pulse-average>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>652bb758-cd2b-434e-838d-e8756d7e68ca</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>3003</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,2076],"pulse_quality":[255,2076]}}</heartrate>\n' +
    '    </chunk>\n' +
    '    <chunk>\n' +
    '      <id>d39e139a-01d1-454e-b2f4-c1f7020899e6</id>\n' +
    '      <position>1</position>\n' +
    '      <start>3003</start>\n' +
    '      <end>6002</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,48,102,1057,102,2083],"pulse_quality":[255,48,255,1057,255,2083]}}</heartrate>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-heartrate-stream>';

  await expect(parseXMLHeartRateData(exampleBadXML2)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML3: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-heartrate-stream>\n' +
    '  <id>c451a714-b233-45e1-ab56-df212d4bce8c</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-13-14T23:16:40.404000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-07-14T16:16:40.404000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-07-14T23:16:40.404000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-07-14T16:16:40.404000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <measurement-duration>6002</measurement-duration>\n' +
    '  <pulse-last>102</pulse-last>\n' +
    '  <pulse-min>102</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-average>102</pulse-average>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>652bb758-cd2b-434e-838d-e8756d7e68ca</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>3003</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,2076],"pulse_quality":[255,2076]}}</heartrate>\n' +
    '    </chunk>\n' +
    '    <chunk>\n' +
    '      <id>d39e139a-01d1-454e-b2f4-c1f7020899e6</id>\n' +
    '      <position>1</position>\n' +
    '      <start>3003</start>\n' +
    '      <end>6002</end>\n' +
    '      <heartrate>{"irregular":{"pulse":[102,48,102,1057,102,2083],"pulse_quality":[255,48,255,1057,255,2083]}}</heartrate>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-heartrate-stream>';

  await expect(parseXMLHeartRateData(exampleBadXML3)).rejects.toStrictEqual([
    {},
  ]);
});

it('Test Parsing XML Blood Pressure Data', async () => {
  let exampleGoodXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-bloodpressure>\n' +
    '  <id>c402e177-95c9-493b-b12f-7b4ef42d0add</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-11T14:21:00.000000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-11T07:21:00.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-11T14:21:03.098145000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-11T07:21:03.098145000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <systolic>113</systolic>\n' +
    '  <diastolic>77</diastolic>\n' +
    '  <pulse>81</pulse>\n' +
    '  <predefined-tags-str>measured_arm_left, body_position_sitting</predefined-tags-str>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <sensor>\n' +
    '    <name>com.taidoc.taidocbus.bp</name>\n' +
    '    <serial>3128213440001333</serial>\n' +
    '    <address>8C:DE:52:30:55:94</address>\n' +
    '    <manufacturer>TaiDoc</manufacturer>\n' +
    '    <model>3128</model>\n' +
    '    <device-db-title>TD-3128</device-db-title>\n' +
    '    <device-db-id>95</device-db-id>\n' +
    '  </sensor>\n' +
    '</measurements-bloodpressure>';
  await expect(
    parseXMLBloodPressureData(exampleGoodXML),
  ).resolves.toStrictEqual([
    {
      SystolicBloodPressureInmmHg: 113,
      DiastolicBloodPressureInmmHg: 77,
      DateTimeTaken: '2019-08-11T14:21:00.000Z',
    },
  ]);

  let exampleBadXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-bloodpressure>\n' +
    '  <id>c402e177-95c9-493b-b12f-7b4ef42d0add</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-11T14:21:00.000000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-11T07:21:00.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-11T14:21:03.098145000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-11T07:21:03.098145000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <systolic>113L</systolic>\n' +
    '  <diastolic>77</diastolic>\n' +
    '  <pulse>81</pulse>\n' +
    '  <predefined-tags-str>measured_arm_left, body_position_sitting</predefined-tags-str>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <sensor>\n' +
    '    <name>com.taidoc.taidocbus.bp</name>\n' +
    '    <serial>3128213440001333</serial>\n' +
    '    <address>8C:DE:52:30:55:94</address>\n' +
    '    <manufacturer>TaiDoc</manufacturer>\n' +
    '    <model>3128</model>\n' +
    '    <device-db-title>TD-3128</device-db-title>\n' +
    '    <device-db-id>95</device-db-id>\n' +
    '  </sensor>\n' +
    '</measurements-bloodpressure>';
  await expect(parseXMLBloodPressureData(exampleBadXML)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML2 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-bloodpressure>\n' +
    '  <id>c402e177-95c9-493b-b12f-7b4ef42d0add</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-11T14:21:00.000000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-11T07:21:00.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-11T14:21:03.098145000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-11T07:21:03.098145000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <systolic>113</systolic>\n' +
    '  <pulse>81</pulse>\n' +
    '  <predefined-tags-str>measured_arm_left, body_position_sitting</predefined-tags-str>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <sensor>\n' +
    '    <name>com.taidoc.taidocbus.bp</name>\n' +
    '    <serial>3128213440001333</serial>\n' +
    '    <address>8C:DE:52:30:55:94</address>\n' +
    '    <manufacturer>TaiDoc</manufacturer>\n' +
    '    <model>3128</model>\n' +
    '    <device-db-title>TD-3128</device-db-title>\n' +
    '    <device-db-id>95</device-db-id>\n' +
    '  </sensor>\n' +
    '</measurements-bloodpressure>';
  await expect(parseXMLBloodPressureData(exampleBadXML2)).rejects.toStrictEqual(
    [{}],
  );

  let exampleBadXML3 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-bloodpressure>\n' +
    '  <id>c402e177-95c9-493b-b12f-7b4ef42d0add</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-32T14:21:00.000000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-11T07:21:00.000000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-11T14:21:03.098145000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-11T07:21:03.098145000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <systolic>113L</systolic>\n' +
    '  <diastolic>77</diastolic>\n' +
    '  <pulse>81</pulse>\n' +
    '  <predefined-tags-str>measured_arm_left, body_position_sitting</predefined-tags-str>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <sensor>\n' +
    '    <name>com.taidoc.taidocbus.bp</name>\n' +
    '    <serial>3128213440001333</serial>\n' +
    '    <address>8C:DE:52:30:55:94</address>\n' +
    '    <manufacturer>TaiDoc</manufacturer>\n' +
    '    <model>3128</model>\n' +
    '    <device-db-title>TD-3128</device-db-title>\n' +
    '    <device-db-id>95</device-db-id>\n' +
    '  </sensor>\n' +
    '</measurements-bloodpressure>';
  await expect(parseXMLBloodPressureData(exampleBadXML3)).rejects.toStrictEqual(
    [{}],
  );
});

it('Test Parsing XML Blood Oxygen Data', async () => {
  let exampleGoodXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-09T16:10:09.751000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <spo2-average>95.35</spo2-average>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';

  await expect(parseXMLBloodOxygenData(exampleGoodXML)).resolves.toStrictEqual([
    {
      BloodOxygenInPercentage: 95,
      DateTimeTaken: '2019-08-09T16:10:09.751Z',
    },
  ]);

  //spo2 percentage can't be above 100
  let exampleBadXML =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-09T16:10:09.751000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <spo2-average>101.35</spo2-average>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';

  await expect(parseXMLBloodOxygenData(exampleBadXML)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML2 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-09T16:10:09.751000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <spo2-average>95.3L5</spo2-average>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';

  await expect(parseXMLBloodOxygenData(exampleBadXML2)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML3 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-09T16:10:09.751000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';

  await expect(parseXMLBloodOxygenData(exampleBadXML3)).rejects.toStrictEqual([
    {},
  ]);

  let exampleBadXML4 =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-oxygen-stream>\n' +
    '  <id>86735ebc-d752-4110-89f6-e06d5519e9d2</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2019-08-09T16:10:61.751000000+00:00</measured-at>\n' +
    '  <measured-at-local>2019-08-09T11:10:09.751000000-05:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-18000</measured-at-utc-offset>\n' +
    '  <client-received-at>2019-08-09T16:10:09.751000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2019-08-09T11:10:09.751000000-05:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-18000</client-received-at-utc-offset>\n' +
    '  <measurement-duration>20001</measurement-duration>\n' +
    '  <spo2-min>95</spo2-min>\n' +
    '  <spo2-max>98</spo2-max>\n' +
    '  <spo2-last>96</spo2-last>\n' +
    '  <spo2-average>95.35</spo2-average>\n' +
    '  <pulse-min>96</pulse-min>\n' +
    '  <pulse-max>102</pulse-max>\n' +
    '  <pulse-last>98</pulse-last>\n' +
    '  <pulse-average>100.1</pulse-average>\n' +
    '  <is-low-battery>false</is-low-battery>\n' +
    '  <battery-percentage>67</battery-percentage>\n' +
    '  <chunks>\n' +
    '    <chunk>\n' +
    '      <id>d43f3553-3732-4145-a8ec-f5e05c95a019</id>\n' +
    '      <position>0</position>\n' +
    '      <start>0</start>\n' +
    '      <end>20001</end>\n' +
    '      <oxygen>{"regular":{"waveform":{"values":[]}},"irregular":{"spo2":[96,56,95,1059,96,2060,96,3044,96,4045,96,5047,95,6072,95,7047,95,8047,95,9048,95,10046,95,11046,95,12058,96,13046,95,14061,95,15047,95,16047,95,17048,95,18056,96,19058],"pulse":[101,56,100,1059,100,2060,100,3044,101,4045,101,5047,102,6069,102,7047,102,8046,101,9047,100,10045,100,11045,99,12058,99,13046,99,14060,99,15046,99,16046,99,17048,99,18056,99,19058],"pulse_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6069,255,7047,255,8046,255,9047,255,10045,255,11045,255,12058,255,13046,255,14060,255,15046,255,16046,255,17048,255,18056,255,19058],"spo2_quality":[255,56,255,1059,255,2060,255,3044,255,4045,255,5047,255,6072,255,7047,255,8047,255,9048,255,10046,255,11046,255,12058,255,13046,255,14061,255,15047,255,16047,255,17048,255,18056,255,19058]}}</oxygen>\n' +
    '    </chunk>\n' +
    '  </chunks>\n' +
    '</measurements-oxygen-stream>\n';

  await expect(parseXMLBloodOxygenData(exampleBadXML4)).rejects.toStrictEqual([
    {},
  ]);
});

it('Test Getting Weight Data', async () => {
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

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
  let connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
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
