import {HAH_Device, HAH_Device_Connection} from './DeviceConnection';
import {XMLParser} from 'fast-xml-parser';

export class MedMDeviceConnection implements HAH_Device_Connection {
  register(license_key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  pairable_device_list(): HAH_Device[] {
    return [];
  }

  paired_device_list(): HAH_Device[] {
    return [];
  }

  pair_device(device: HAH_Device): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  unpair_device(device: HAH_Device): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  get_data(
    id: number,
    parse: (xml: string) => Record<string, any>[],
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      resolve([{}]);
    });
  }
}

export class MedMDevice implements HAH_Device {
  address: string;
  id: number;
  manufacturer: string;
  modelName: string;
  name: string;

  constructor(
    address: string,
    id: number,
    manufacturer: string,
    modelName: string,
    name: string,
  ) {
    this.address = address;
    this.id = id;
    this.manufacturer = manufacturer;
    this.modelName = modelName;
    this.name = name;
  }
}

export function parseXMLWeightData(
  xml: string,
): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    try {
      const parser = new XMLParser();
      let obj = parser.parse(xml);
      let weightInPounds: number = Math.floor(
        Number(obj['measurements-weight']['value-in-us']),
      );
      if (Number.isNaN(weightInPounds)) {
        throw new Error('Invalid Number');
      }
      let dateTimeTaken: string = new Date(
        obj['measurements-weight']['measured-at'],
      ).toISOString();
      resolve([{WeightInPounds: weightInPounds, DateTimeTaken: dateTimeTaken}]);
    } catch (e) {
      reject([{}]);
    }
  });
}

//Parses UTC datetime and average heart rate
export function parseXMLHeartRateData(
  xml: string,
): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    try {
      const parser = new XMLParser();
      let obj = parser.parse(xml);
      let heartRateInBPM: number = Math.floor(
        Number(obj['measurements-heartrate-stream']['pulse-average']),
      );
      if (Number.isNaN(heartRateInBPM)) {
        throw new Error('Invalid Number');
      }
      let dateTimeTaken: string = new Date(
        obj['measurements-heartrate-stream']['measured-at'],
      ).toISOString();
      resolve([{HeartRateInBPM: heartRateInBPM, DateTimeTaken: dateTimeTaken}]);
    } catch (e) {
      reject([{}]);
    }
  });
}

export function parseXMLBloodPressureData(
  xml: string,
): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    try {
      const parser = new XMLParser();
      let obj = parser.parse(xml);
      let systolicBloodPressureInmmHg: number = Math.floor(
        Number(obj['measurements-bloodpressure'].systolic),
      );
      let diastolicBloodPressureInmmHg: number = Math.floor(
        Number(obj['measurements-bloodpressure'].diastolic),
      );
      if (
        Number.isNaN(systolicBloodPressureInmmHg) ||
        Number.isNaN(diastolicBloodPressureInmmHg)
      ) {
        throw new Error('Invalid Number');
      }
      let dateTimeTaken: string = new Date(
        obj['measurements-bloodpressure']['measured-at'],
      ).toISOString();
      resolve([
        {
          SystolicBloodPressureInmmHg: systolicBloodPressureInmmHg,
          DiastolicBloodPressureInmmHg: diastolicBloodPressureInmmHg,
          DateTimeTaken: dateTimeTaken,
        },
      ]);
    } catch (e) {
      reject([{}]);
    }
  });
}

export function parseXMLBloodOxygenData(
  xml: string,
): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    try {
      const parser = new XMLParser();
      let obj = parser.parse(xml);
      let bloodOxygenInPercentage: number = Math.floor(
        Number(obj['measurements-oxygen-stream']['spo2-average']),
      );
      if (
        Number.isNaN(bloodOxygenInPercentage) ||
        Number(obj['measurements-oxygen-stream']['spo2-average']) > 100
      ) {
        throw new Error('Invalid Number');
      }
      let dateTimeTaken: string = new Date(
        obj['measurements-oxygen-stream']['measured-at'],
      ).toISOString();
      resolve([{BloodOxygenInPercentage: bloodOxygenInPercentage, DateTimeTaken: dateTimeTaken}]);
    } catch (e) {
      reject([{}]);
    }
  });
}
