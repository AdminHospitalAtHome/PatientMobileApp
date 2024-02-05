// noinspection SpellCheckingInspection

import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
  VitalTypeUtilities,
} from './DeviceConnection';
import {XMLParser} from 'fast-xml-parser';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import React from 'react';
import {ReactStorage} from '../ReactStorage';

const {MedMDeviceManager} = NativeModules;
const eventEmitter = new NativeEventEmitter(NativeModules.MedMDeviceManager);

export class MedMDeviceConnection implements HAH_Device_Connection {
  private static instance: MedMDeviceConnection;

  private data: string[] = [];
  //private pairableDevices = new Array<HAH_Device>();
  private newDeviceEventListiner: EmitterSubscription =
    eventEmitter.addListener('New_Device', event => {});
  private pairDeviceEventListener: EmitterSubscription =
    eventEmitter.addListener('Pair_Device', event => {});

  public static getInstance(): HAH_Device_Connection {
    if (!MedMDeviceConnection.instance) {
      MedMDeviceConnection.instance = new MedMDeviceConnection();
    }

    return MedMDeviceConnection.instance;
  }

  private constructor() {
    MedMDeviceManager.init();
  }

  public startDeviceScan(
    setPairableDevices: React.Dispatch<React.SetStateAction<HAH_Device[]>>,
  ): void {
    this.newDeviceEventListiner.remove();
    this.newDeviceEventListiner = eventEmitter.addListener(
      'New_Device',
      event => {
        setPairableDevices(parseDevicesJson(event.pairableDevices));
      },
    );

    MedMDeviceManager.startDeviceScan();
  }

  public stopDeviceScan(
    setPairableDevices: React.Dispatch<React.SetStateAction<HAH_Device[]>>,
  ): Promise<Boolean> {
    setPairableDevices(new Array<HAH_Device>());
    this.newDeviceEventListiner.remove();
    return MedMDeviceManager.stopDeviceScan();
  }

  pairable_device_list(): Promise<HAH_Device[]> {
    return MedMDeviceManager.pairableDeviceList().then((res: string) =>
      parseDevicesJson(res),
    );
  }

  paired_device_list(): Promise<HAH_Device[]> {
    return MedMDeviceManager.getPairedDevices().then((res: string) =>
      parseDevicesJson(res),
    );
  }

  paired_device_list_vital(vital: VitalType): Promise<HAH_Device[]> {
    return new Promise<HAH_Device[]>(resolve => {
      this.paired_device_list().then(devices => {
        let filteredDevices: HAH_Device[] = [];
        for (let i = 0; i < devices.length; i++) {
          if (devices[i].vitalType.includes(vital)) {
            filteredDevices.push(devices[i]);
          }
        }
        console.log(filteredDevices);
        resolve(filteredDevices);
      });
    });
  }

  setDefaultDevice(address: string, vitalType: VitalType): Promise<void> {
    return new Promise((resolve, reject) => {
      ReactStorage.getInstance()
        .saveDefaultDevice(address, vitalType)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  default_paried_device(vital: VitalType): Promise<HAH_Device> {
    return new Promise((resolve, reject) => {
      ReactStorage.getInstance()
        .getDefaultDevice(vital)
        .then(address => {
          MedMDeviceManager.getDeviceByAddress(address)
            .then((deviceJson: string) => {
              resolve(parseDeviceJson(deviceJson));
            })
            .catch(() => {
              reject(null);
            });
        })
        .catch(() => {
          reject(null);
        });
    });
  }

  // TODO: Add check for failed pairing
  pair_device(device: HAH_Device): Promise<void> {
    return new Promise(resolve => {
      this.pairDeviceEventListener.remove();
      this.pairDeviceEventListener = eventEmitter.addListener(
        'New_Device',
        () => {
          this.pairDeviceEventListener.remove();
        },
      );
      MedMDeviceManager.pairDevice(device.address);
      resolve();
    });
  }

  unpair_device(device: HAH_Device): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  setDeviceFilter(address: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (address === '') {
        reject();
      } else {
        MedMDeviceManager.setDeviceFilter(address)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  }

  startCollector(
    setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    sendToServer: (data: string[]) => Promise<void>,
  ): void {
    MedMDeviceManager.startCollector((data: string[]) => {
      sendToServer(data).then(() => {
        setLoadingModalVisible(false);
      });
    });
  }

  stopCollector(): Promise<boolean> {
    return new Promise(resolve => {
      MedMDeviceManager.manualStopCollector().then((res: boolean) => {
        resolve(res);
      });
    });
  }

  getCollectedData(): string[] {
    return this.data;
  }
}

export class MedMDevice implements HAH_Device {
  address: string;
  id: string;
  manufacturer: string;
  model: string;
  modelName: string;
  name: string;
  vitalType: VitalType[];

  constructor(
    address: string,
    id: string,
    manufacturer: string,
    model: string,
    modelName: string,
    name: string,
    vitalType: VitalType[],
  ) {
    this.address = address;
    this.id = id;
    this.manufacturer = manufacturer;
    this.modelName = modelName;
    this.model = model;
    this.name = name;
    this.vitalType = vitalType;
  }
}

export function parseDevicesJson(text: string): HAH_Device[] {
  let devices: HAH_Device[] = [];
  let json = JSON.parse(text);
  for (let i = 0; i < json.length; i++) {
    let vitals: VitalType[] = [];
    for (let j = 0; j < json[i].measurementTypes.length; j++) {
      vitals.push(VitalTypeUtilities.fromString(json[i].measurementTypes[j]));
    }
    let device = new MedMDevice(
      json[i].address,
      json[i].id,
      json[i].manufacturer,
      json[i].model,
      json[i].modelName,
      json[i].name,
      vitals,
    );
    devices.push(device);
  }

  return devices;
}

// TODO: Fix this to remove duplicated code
export function parseDeviceJson(text: string): HAH_Device {
  let json = JSON.parse(text);
  let vitals: VitalType[] = [];
  for (let i = 0; i < json.measurementTypes.length; i++) {
    vitals.push(VitalTypeUtilities.fromString(json.measurementTypes[i]));
  }

  return new MedMDevice(
    json.address,
    json.id,
    json.manufacturer,
    json.model,
    json.modelName,
    json.name,
    vitals,
  );
}

export function parseXMLWeightData(xml: string): Record<string, any> {
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
    return {WeightInPounds: weightInPounds, DateTimeTaken: dateTimeTaken};
  } catch (e) {
    return {};
  }
}

// Since HeartRate can come from multiple sources, our parser needs to be able to handle that
export function parseXMLHeartRateData(xml: string): Record<string, any> {
  try {
    const parser = new XMLParser();
    let obj = parser.parse(xml);

    let searchTerm = '';
    let pulseTerm = '';
    if (obj['measurements-bloodpressure'] !== null) {
      searchTerm = 'measurements-bloodpressure';
      pulseTerm = 'pulse';
    }
    if (searchTerm === '') {
      throw new Error('Unsopported Measurement Type');
    }

    let heartRateInBPM: number = Math.floor(Number(obj[searchTerm][pulseTerm]));
    if (Number.isNaN(heartRateInBPM)) {
      throw new Error('Invalid Number');
    }
    let dateTimeTaken: string = new Date(
      obj[searchTerm]['measured-at'],
    ).toISOString();
    return {HeartRateInBPM: heartRateInBPM, DateTimeTaken: dateTimeTaken};
  } catch (e) {
    return {};
  }
}

export function parseXMLBloodPressureData(xml: string): Record<string, any> {
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
    return {
      SystolicBloodPressureInmmHg: systolicBloodPressureInmmHg,
      DiastolicBloodPressureInmmHg: diastolicBloodPressureInmmHg,
      DateTimeTaken: dateTimeTaken,
    };
  } catch (e) {
    return {};
  }
}

export function parseXMLBloodOxygenData(xml: string): Record<string, any> {
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
    return {
      BloodOxygenInPercentage: bloodOxygenInPercentage,
      DateTimeTaken: dateTimeTaken,
    };
  } catch (e) {
    return {};
  }
}
