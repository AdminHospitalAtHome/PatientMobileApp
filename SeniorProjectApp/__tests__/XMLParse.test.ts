import {afterEach, expect, it, jest} from '@jest/globals';
import {
  parseXMLBloodOxygenData,
  parseXMLBloodPressureData,
  parseXMLHeartRateData,
  parseXMLSpirometryData,
  parseXMLWeightData,
} from '../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

afterEach(() => {
  jest.clearAllMocks();
});

it('Test Parsing XML Weight Data', () => {
  // noinspection SpellCheckingInspection
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

  expect(parseXMLWeightData(exampleGoodXML)).toStrictEqual({
    WeightInPounds: 173,
    DateTimeTaken: '2019-08-14T14:38:16.000Z',
  });
  // noinspection SpellCheckingInspection
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

  expect(parseXMLWeightData(exampleBadXML)).toStrictEqual({});
  // noinspection SpellCheckingInspection
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

  expect(parseXMLWeightData(exampleBadXML2)).toStrictEqual({});
  // noinspection SpellCheckingInspection
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

  expect(parseXMLWeightData(exampleBadXML3)).toStrictEqual({});
});

it('Test Parsing XML Heart Rate Data', () => {
  // noinspection SpellCheckingInspection
  let exampleGoodXML: string =
    '<measurements-bloodpressure>\n' +
    '    <measured-at>2024-04-19T14:33:56Z</measured-at>\n' +
    '    <measured-at-local>2024-04-19T10:33:56-04:00</measured-at-local>\n' +
    '    <measured-at-utc-offset>-14400</measured-at-utc-offset>\n' +
    '    <client-received-at>2024-04-19T14:34:13.137Z</client-received-at>\n' +
    '    <client-received-at-local>2024-04-19T10:34:13.137-04:00</client-received-at-local>\n' +
    '    <client-received-at-utc-offset>-14400</client-received-at-utc-offset>\n' +
    '    <sensor>\n' +
    '        <manufacturer>Omron</manufacturer>\n' +
    '        <firmware>C.00.7AP-01</firmware>\n' +
    '        <serial>20200607031A</serial>\n' +
    '        <name>BLEsmart_00000116B0495F086C71</name>\n' +
    '        <device-db-title>HEM-9200T/9210T</device-db-title>\n' +
    '        <address>B0:49:5F:08:6C:71</address>\n' +
    '        <model>HEM-9200T</model>\n' +
    '        <hardware>0000000000000100</hardware>\n' +
    '        <device-db-id>364</device-db-id>\n' +
    '    </sensor>\n' +
    '    <battery-percentage>100</battery-percentage>\n' +
    '    <predefined-tags-str>movement_during_measurement_not_detected,irregular_pulse_not_detected</predefined-tags-str>\n' +
    '    <systolic>128</systolic>\n' +
    '    <diastolic>90</diastolic>\n' +
    '    <pulse>102</pulse>\n' +
    '</measurements-bloodpressure>';

  expect(parseXMLHeartRateData(exampleGoodXML)).toStrictEqual({
    HeartRateInBPM: 102,
    DateTimeTaken: '2024-04-19T14:33:56.000Z',
  });

  // noinspection SpellCheckingInspection
  let exampleBadXML: string =
    '<measurements-bloodpressure>\n' +
    '    <measured-at>2024-04-19T14:33:56Z</measured-at>\n' +
    '    <measured-at-local>2024-04-19T10:33:56-04:00</measured-at-local>\n' +
    '    <measured-at-utc-offset>-14400</measured-at-utc-offset>\n' +
    '    <client-received-at>2024-04-19T14:34:13.137Z</client-received-at>\n' +
    '    <client-received-at-local>2024-04-19T10:34:13.137-04:00</client-received-at-local>\n' +
    '    <client-received-at-utc-offset>-14400</client-received-at-utc-offset>\n' +
    '    <sensor>\n' +
    '        <manufacturer>Omron</manufacturer>\n' +
    '        <firmware>C.00.7AP-01</firmware>\n' +
    '        <serial>20200607031A</serial>\n' +
    '        <name>BLEsmart_00000116B0495F086C71</name>\n' +
    '        <device-db-title>HEM-9200T/9210T</device-db-title>\n' +
    '        <address>B0:49:5F:08:6C:71</address>\n' +
    '        <model>HEM-9200T</model>\n' +
    '        <hardware>0000000000000100</hardware>\n' +
    '        <device-db-id>364</device-db-id>\n' +
    '    </sensor>\n' +
    '    <battery-percentage>100</battery-percentage>\n' +
    '    <predefined-tags-str>movement_during_measurement_not_detected,irregular_pulse_not_detected</predefined-tags-str>\n' +
    '    <systolic>128</systolic>\n' +
    '    <diastolic>90</diastolic>\n' +
    '</measurements-bloodpressure>';

  expect(parseXMLHeartRateData(exampleBadXML)).toStrictEqual({});

  // noinspection SpellCheckingInspection
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

  expect(parseXMLHeartRateData(exampleBadXML2)).toStrictEqual({});

  // noinspection SpellCheckingInspection
  let exampleUnsupportedXML: string =
    '<measurements-bloodpressure>\n' +
    '    <measured-at>2024-04-19T14:33:56Z</measured-at>\n' +
    '    <measured-at-local>2024-04-19T10:33:56-04:00</measured-at-local>\n' +
    '    <measured-at-utc-offset>-14400</measured-at-utc-offset>\n' +
    '    <client-received-at>2024-04-19T14:34:13.137Z</client-received-at>\n' +
    '    <client-received-at-local>2024-04-19T10:34:13.137-04:00</client-received-at-local>\n' +
    '    <client-received-at-utc-offset>-14400</client-received-at-utc-offset>\n' +
    '    <sensor>\n' +
    '        <manufacturer>Omron</manufacturer>\n' +
    '        <firmware>C.00.7AP-01</firmware>\n' +
    '        <serial>20200607031A</serial>\n' +
    '        <name>BLEsmart_00000116B0495F086C71</name>\n' +
    '        <device-db-title>HEM-9200T/9210T</device-db-title>\n' +
    '        <address>B0:49:5F:08:6C:71</address>\n' +
    '        <model>HEM-9200T</model>\n' +
    '        <hardware>0000000000000100</hardware>\n' +
    '        <device-db-id>364</device-db-id>\n' +
    '    </sensor>\n' +
    '    <battery-percentage>100</battery-percentage>\n' +
    '    <predefined-tags-str>movement_during_measurement_not_detected,irregular_pulse_not_detected</predefined-tags-str>\n' +
    '    <systolic>128</systolic>\n' +
    '    <diastolic>90</diastolic>\n' +
    '    <pulse>102</pulse>\n' +
    '</measurements-bloodpressure>';
});

it('Test Parsing XML Blood Pressure Data', () => {
  // noinspection SpellCheckingInspection
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
  // noinspection SpellCheckingInspection
  expect(parseXMLBloodPressureData(exampleGoodXML)).toStrictEqual({
    SystolicBloodPressureInmmHg: 113,
    DiastolicBloodPressureInmmHg: 77,
    DateTimeTaken: '2019-08-11T14:21:00.000Z',
  });

  // noinspection SpellCheckingInspection
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
  expect(parseXMLBloodPressureData(exampleBadXML)).toStrictEqual({});

  // noinspection SpellCheckingInspection
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
  expect(parseXMLBloodPressureData(exampleBadXML2)).toStrictEqual({});

  // noinspection SpellCheckingInspection
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
  expect(parseXMLBloodPressureData(exampleBadXML3)).toStrictEqual({});
});

it('Test Parsing XML Blood Oxygen Data', () => {
  // noinspection SpellCheckingInspection
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

  expect(parseXMLBloodOxygenData(exampleGoodXML)).toStrictEqual({
    BloodOxygenInPercentage: 95,
    DateTimeTaken: '2019-08-09T16:10:09.751Z',
  });

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

  expect(parseXMLBloodOxygenData(exampleBadXML)).toStrictEqual({});

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

  expect(parseXMLBloodOxygenData(exampleBadXML2)).toStrictEqual({});

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

  expect(parseXMLBloodOxygenData(exampleBadXML3)).toStrictEqual({});

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

  expect(parseXMLBloodOxygenData(exampleBadXML4)).toStrictEqual({});
});

it('Test Parsing XML Spirometry Data', () => {
  // noinspection SpellCheckingInspection
  let exampleGoodXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleGoodXML)).toStrictEqual({
    SpirometryFEV1InLiters: 2.58,
    SpirometryFEV1_FVCInPercentage: 95,
    DateTimeTaken: '2018-04-29T17:10:27.040Z',
  });

  // noinspection SpellCheckingInspection
  let exampleBadXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271a,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleBadXML)).toStrictEqual({});

  // noinspection SpellCheckingInspection
  let exampleNoFEV1PXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleNoFEV1PXML)).toStrictEqual({
    SpirometryFEV1InLiters: 2.58,
    SpirometryFEV1_FVCInPercentage: 95,
    DateTimeTaken: '2018-04-29T17:10:27.040Z',
  });

  // noinspection SpellCheckingInspection
  let exampleFEV1inLitersXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":2.58,"units":"l"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleFEV1inLitersXML)).toStrictEqual({
    SpirometryFEV1InLiters: 2.58,
    SpirometryFEV1_FVCInPercentage: 95,
    DateTimeTaken: '2018-04-29T17:10:27.040Z',
  });

  //FEV1 is not a number
  // noinspection SpellCheckingInspection
  let exampleBadXML2: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258a,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleBadXML2)).toStrictEqual({});

  //FVC is over 100%
  // noinspection SpellCheckingInspection
  let exampleBadXML3: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":101.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleBadXML3)).toStrictEqual({});

  // noinspection SpellCheckingInspection
  // let exampleFVCNotNumberXML2: string =
  //   '<?xml version="1.0" encoding="UTF-8"?>\n' +
  //   '<measurements-spirometry>\n' +
  //   '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
  //   '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
  //   '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
  //   '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
  //   '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
  //   '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
  //   '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
  //   '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
  //   '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":258,"units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
  //   '  <drugs>pre</drugs>\n' +
  //   '  <test-type>fvc</test-type>\n' +
  //   '  <protocol>generic_spirometry</protocol>\n' +
  //   '</measurements-spirometry>\n';
  //
  // expect(parseXMLSpirometryData(exampleFVCNotNumberXML2)).toStrictEqual({
  //   SpirometryFEV1InLiters: 2.58,
  //   SpirometryFEV1_FVCInPercentage: 95,
  //   DateTimeTaken: '2018-04-29T17:10:27.040Z',
  // });

  let exampleFEV1NotNumberXML: string =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<measurements-spirometry>\n' +
    '  <id>2bd5addb-2baf-234a-b33a-af6430b300cd</id>\n' +
    '  <instance-id>ae770afe-2e21-4f31-b410-2c2f5006b5b1</instance-id>\n' +
    '  <measured-at>2018-04-29T17:10:27.040000000+00:00</measured-at>\n' +
    '  <measured-at-local>2018-04-29T10:10:27.040000000-07:00</measured-at-local>\n' +
    '  <measured-at-utc-offset>-25200</measured-at-utc-offset>\n' +
    '  <client-received-at>2018-04-29T17:10:27.040000000+00:00</client-received-at>\n' +
    '  <client-received-at-local>2018-04-29T10:10:27.040000000-07:00</client-received-at-local>\n' +
    '  <client-received-at-utc-offset>-25200</client-received-at-utc-offset>\n' +
    '  <spirometry>{"FEV6p":{"value":95.2,"units":"%"},"FEF25":{"value":474,"units":"cl/s"},"VTChart":{"Loops":{"Units":{"volume":"cl","time":"msec"},"Points":[[0,1,100,14,200,32,300,49,400,64,500,75,600,84,700,91,800,96,900,100,1000,102,1100,104,1200,105,1300,107,1400,107]]}},"MV":{"value":0,"units":"cl/m"},"FVC":{"value":271,"units":"cl"},"FEF75":{"value":214,"units":"cl/s"},"MVV":{"value":0,"units":"cl"},"FVCChart":{"Loops":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[2250,-49,2220,-71,2190,-87,2160,-103,2130,-118,2100,-131,2070,-143,2040,-154,2010,-163,1980,-168,1950,-174,1920,-180,1890,-186,1860,-191,1830,-195,1800,-198,1770,-201,1740,-203,1710,-205,1680,-206,1650,-207,1620,-207,1590,-206,1560,-203,1530,-201,1500,-201,1470,-203,1440,-204,1410,-204,1380,-203,1350,-202,1320,-201,1290,-203,1260,-206,1230,-208,1200,-209,1170,-209,1140,-210,1110,-213,1080,-216,1050,-218,1020,-219,990,-220,960,-220,930,-221,900,-224,870,-224,840,-226,810,-228,780,-229,750,-231,720,-232,690,-231,660,-230,630,-229,600,-229,570,-228,540,-228,510,-225,480,-223,450,-220,420,-218,390,-214,360,-210,330,-205,300,-199,270,-192,240,-185,210,-178,180,-170,150,-164,120,-156,90,-146,60,-134,30,-108,0,-85,30,51,60,171,90,257,120,291,150,320,180,348,210,361,240,376,270,391,300,405,330,413,360,426,390,439,420,442,450,450,480,462,510,464,540,461,570,467,600,462,630,465,660,468,690,474,720,475,750,467,780,463,810,465,840,449,870,446,900,446,930,438,960,434,990,431,1020,423,1050,416,1080,413,1110,410,1140,403,1170,397,1200,390,1230,384,1260,380,1290,371,1320,367,1350,363,1380,363,1410,358,1440,351,1470,342,1500,338,1530,330,1560,328,1590,326,1620,319,1650,313,1680,306,1710,299,1740,291,1770,282,1800,276,1830,264,1860,259,1890,253,1920,245,1950,238,1980,232,2010,222,2040,214,2070,208,2100,200,2130,195,2160,188,2190,181,2220,174,2250,162,2280,156,2310,148,2340,135,2370,127,2400,120,2430,110,2460,103,2490,90,2520,81,2550,69,2580,62,2610,56,2640,46,2670,40,2700,30],[2670,-29,2640,-36,2610,-59,2580,-89,2550,-113,2520,-132,2490,-144,2460,-151,2430,-156,2400,-159,2370,-161,2340,-165,2310,-167,2280,-170,2250,-172,2220,-175,2190,-177,2160,-180,2130,-183,2100,-184,2070,-183,2040,-181,2010,-180,1980,-179,1950,-178,1920,-176,1890,-175,1860,-175,1830,-175,1800,-175,1770,-175,1740,-176,1710,-177,1680,-177,1650,-177,1620,-177,1590,-177,1560,-176,1530,-176,1500,-176,1470,-176,1440,-175,1410,-174,1380,-173,1350,-172,1320,-170,1290,-169,1260,-169,1230,-169,1200,-170,1170,-172,1140,-172,1110,-173,1080,-173,1050,-173,1020,-171,990,-168,960,-167,930,-163,900,-159,870,-156,840,-152,810,-149,780,-147,750,-145,720,-141,690,-137,660,-133,630,-127,600,-122,570,-115,540,-99,510,-85,540,113,570,199,600,226,630,247,660,276,690,294,720,316,750,332,780,343,810,347,840,354,870,362,900,371,930,375,960,380,990,383,1020,386,1050,383,1080,379,1110,378,1140,377,1170,380,1200,382,1230,373,1260,363,1290,360,1320,355,1350,351,1380,345,1410,340,1440,336,1470,340,1500,331,1530,328,1560,326,1590,324,1620,326,1650,321,1680,311,1710,303,1740,302,1770,294,1800,286,1830,284,1860,279,1890,270,1920,258,1950,252,1980,247,2010,236,2040,234,2070,229,2100,225,2130,212,2160,201,2190,195,2220,186,2250,179,2280,169,2310,158,2340,150,2370,145,2400,136,2430,128,2460,121,2490,109,2520,102,2550,89,2580,79,2610,65,2640,57,2670,46,2700,40,2730,32,2760,27,2790,19,2820,7],[2790,-27,2760,-46,2730,-61,2700,-71,2670,-77,2640,-82,2610,-86,2580,-91,2550,-98,2520,-109,2490,-121,2460,-128,2430,-135,2400,-139,2370,-143,2340,-144,2310,-146,2280,-147,2250,-149,2220,-150,2190,-152,2160,-151,2130,-150,2100,-148,2070,-147,2040,-146,2010,-146,1980,-146,1950,-145,1920,-145,1890,-146,1860,-147,1830,-146,1800,-146,1770,-146,1740,-146,1710,-146,1680,-145,1650,-145,1620,-145,1590,-144,1560,-142,1530,-140,1500,-139,1470,-138,1440,-138,1410,-138,1380,-138,1350,-138,1320,-138,1290,-138,1260,-139,1230,-139,1200,-139,1170,-138,1140,-135,1110,-130,1080,-123,1050,-112,1020,-93,1050,55,1080,171,1110,243,1140,265,1170,287,1200,307,1230,327,1260,334,1290,342,1320,352,1350,355,1380,359,1410,366,1440,377,1470,384,1500,384,1530,389,1560,393,1590,397,1620,405,1650,397,1680,400,1710,399,1740,402,1770,394,1800,397,1830,392,1860,388,1890,391,1920,387,1950,386,1980,389,2010,384,2040,384,2070,378,2100,371,2130,366,2160,361,2190,354,2220,346,2250,340,2280,338,2310,331,2340,322,2370,318,2400,312,2430,307,2460,297,2490,294,2520,289,2550,280,2580,275,2610,272,2640,265,2670,258,2700,255,2730,247,2760,243,2790,232,2820,228,2850,221,2880,216,2910,211,2940,206,2970,198,3000,185,3030,176,3060,166,3090,158,3120,147,3150,138,3180,133,3210,128,3240,122,3270,113,3300,105,3330,96,3360,90,3390,85,3420,78,3450,73,3480,67,3510,61,3540,56,3570,39],[3540,-6]]},"BestLoop":{"Units":{"volume":"ml","flow":"cl/s"},"Points":[[0,81,50,250,100,319,150,344,200,369,250,401,300,407,350,438,400,445,450,457,500,457,550,457,600,463,650,470,700,463,750,457,800,445,850,445,900,432,950,426,1000,413,1050,407,1100,401,1150,388,1200,382,1250,369,1300,357,1350,357,1400,344,1450,332,1500,326,1550,319,1600,307,1650,300,1700,288,1750,275,1800,263,1850,250,1900,231,1950,231,2000,213,2050,194,2100,194,2150,175,2200,156,2250,150,2300,131,2350,119,2400,106,2450,87,2500,68,2550,56,2600,43,2550,0,2500,-12,2450,-31,2400,-87,2350,-112,2300,-137,2250,-150,2200,-156,2150,-163,2100,-169,2050,-169,2000,-175,1950,-181,1900,-181,1850,-175,1800,-175,1750,-175,1700,-169,1650,-169,1600,-169,1550,-175,1500,-175,1450,-175,1400,-175,1350,-175,1300,-175,1250,-169,1200,-169,1150,-169,1100,-163,1050,-163,1000,-169,950,-169,900,-169,850,-169,800,-163,750,-156,700,-156,650,-150,600,-144,550,-144,500,-131,450,-125,400,-119,350,-94,300,0]]}},"VCC":{"value":0,"units":"cl"},"TE":{"value":0,"units":"msec"},"FEV3p":{"value":100,"units":"%"},"PEFF":{"value":0,"units":"cl/s"},"IC":{"value":0,"units":"cl"},"ERV":{"value":0,"units":"cl"},"FVV12":{"value":0,"units":"cl"},"FIV1":{"value":196,"units":"cl"},"IVC":{"value":0,"units":"cl"},"FIV1p":{"value":88.3,"units":"%"},"FEF2575":{"value":364,"units":"cl/s"},"FEF50":{"value":363,"units":"cl/s"},"FET":{"value":131,"units":"msec"},"PIF":{"value":184,"units":"cl/s"},"FEV1":{"value":"AAA","units":"cl"},"EVC":{"value":0,"units":"cl"},"FIVC":{"value":222,"units":"cl"},"FVV1":{"value":0,"units":"cl"},"PEF":{"value":475,"units":"cl/s"},"FVV62":{"value":0,"units":"cl/s"},"TV_TI":{"value":0,"units":"l/s"},"TI":{"value":0,"units":"msec"},"FEV6":{"value":271,"units":"cl"},"PEFF2":{"value":0,"units":"cl/s"},"FVVC2":{"value":0,"units":"cl"},"FVV6":{"value":0,"units":"cl/s"},"TV":{"value":0,"units":"cl"},"FEV1p":{"value":95.2,"units":"%"},"FVVC":{"value":0,"units":"cl"},"VEXT":{"value":80,"units":"ml"},"MVVcalc":{"value":903,"units":"cl"},"FEV3":{"value":271,"units":"cl"},"IT":{"value":0,"units":"cl"},"VCC2":{"value":0,"units":"cl"}}</spirometry>\n' +
    '  <drugs>pre</drugs>\n' +
    '  <test-type>fvc</test-type>\n' +
    '  <protocol>generic_spirometry</protocol>\n' +
    '</measurements-spirometry>\n';

  expect(parseXMLSpirometryData(exampleFEV1NotNumberXML)).toStrictEqual({});
});
