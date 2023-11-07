import {HAH_Device, HAH_Device_Connection, VitalType} from './DeviceConnection';
import {XMLParser} from 'fast-xml-parser';
import {NativeModules} from 'react-native';
import React from 'react';

const {MedMDeviceManager} = NativeModules;

export class MedMDeviceConnection implements HAH_Device_Connection {
  private static instance: MedMDeviceConnection;
  //private pairableDevices = new Array<HAH_Device>();

  public static getInstance(): HAH_Device_Connection {
    if (!MedMDeviceConnection.instance) {
      MedMDeviceConnection.instance = new MedMDeviceConnection();
    }

    return MedMDeviceConnection.instance;
  }

  private constructor() {
    //TODO: REGISTER HERE
    MedMDeviceManager.init();
  }

  public startDeviceScan(
    setNewDeviceAvailable: React.Dispatch<React.SetStateAction<boolean>>,
    newDeviceAvailable: boolean,
  ): void {
    MedMDeviceManager.startDeviceScan(() => {
      console.log('Device Callback Triggered');
      MedMDeviceManager.deviceScanSetNewCallback(() => {
        console.log('New Device Callback Triggered');
        setNewDeviceAvailable(!newDeviceAvailable);
      });
      setNewDeviceAvailable(!newDeviceAvailable);
    });
  }

  stopDeviceScan(): Promise<Boolean> {
    return MedMDeviceManager.stopDeviceScan();
  }

  pairable_device_list(): Promise<HAH_Device[]> {
    return MedMDeviceManager.pairableDeviceList().then(res => parseDevicesJson(res));
  }

  paired_device_list(): Promise<HAH_Device[]> {
    return MedMDeviceManager.pairableDeviceList().then(res => res.json());
  }

  default_paried_device(vital: VitalType): Promise<HAH_Device> {
    return new Promise((resolve, reject) => {
      resolve(
        new MedMDevice('Address', '1', 'Omron', 'HN-290T', 'Omron HN-290T'),
      );
    });
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
    parse: (xml: string) => Promise<Record<string, any>[]>,
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      resolve([{}]);
    });
  }
}

export class MedMDevice implements HAH_Device {
  address: string;
  id: string;
  manufacturer: string;
  modelName: string;
  name: string;

  constructor(
    address: string,
    id: string,
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

export function parseDevicesJson(text: string): Promise<HAH_Device[]> {
  return new Promise((resolve, reject) => {

    let devices = new Array<HAH_Device>();
    try {
      let json = JSON.parse(text);
      for (let i = 0; i < json.length; i++) {
        let device = new MedMDevice(
          json[i].address,
          json[i].id,
          json[i].manufacturer,
          json[i].modelName,
          json[i].name,
        );
        devices.push(device);
      }
      console.log(json);
      resolve(devices);
    } catch (e) {
      reject(devices);
    }
  });
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
      resolve([
        {
          BloodOxygenInPercentage: bloodOxygenInPercentage,
          DateTimeTaken: dateTimeTaken,
        },
      ]);
    } catch (e) {
      reject([{}]);
    }
  });
}
