import {HAH_Device, HAH_Device_Connection, VitalType} from './DeviceConnection';
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
    eventEmitter.addListener('New_Device', event => {
      console.log('Event Running but not set yet.');
    });
  private pairDeviceEventListener: EmitterSubscription =
    eventEmitter.addListener('Pair_Device', event => {
      console.log('Pair Device Event Running but not set yet.');
    });

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
    setPairableDevices: React.Dispatch<React.SetStateAction<HAH_Device[]>>,
  ): void {
    this.newDeviceEventListiner.remove();
    this.newDeviceEventListiner = eventEmitter.addListener(
      'New_Device',
      event => {
        console.log('AAGHH');
        console.log(parseDevicesJson(event.pairableDevices));
        setPairableDevices(parseDevicesJson(event.pairableDevices));

        console.log('Evnet Triggered');
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
    console.log('get pairable devices');
    return MedMDeviceManager.pairableDeviceList().then(res =>
      parseDevicesJson(res),
    );
  }

  paired_device_list(): Promise<HAH_Device[]> {
    console.log('Getting Paired Devices');
    return MedMDeviceManager.getPairedDevices().then(res =>
      parseDevicesJson(res),
    );
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
            .then(deviceJson => {
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

  pair_device(device: HAH_Device, navigation: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pairDeviceEventListener.remove();
      this.pairDeviceEventListener = eventEmitter.addListener(
        'New_Device',
        event => {
          navigation.goBack();

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

  get_data(
    id: number,
    parse: (xml: string) => Promise<Record<string, any>[]>,
  ): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      resolve([{}]);
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
    setDataModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ): void {
    MedMDeviceManager.startCollector((data) => {
      this.data = JSON.parse(data);
      setLoadingModalVisible(false);
      setDataModalVisible(true);

    });
  }

  stopCollector(): Promise<boolean> {
    return new Promise(resolve => {
      MedMDeviceManager.manualStopCollector().then(res => {
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

  constructor(
    address: string,
    id: string,
    manufacturer: string,
    model: string,
    modelName: string,
    name: string,
  ) {
    this.address = address;
    this.id = id;
    this.manufacturer = manufacturer;
    this.modelName = modelName;
    this.model = model;
    this.name = name;
  }
}

export function parseDevicesJson(text: string): HAH_Device[] {
  let devices = new Array<HAH_Device>();
  let json = JSON.parse(text);
  for (let i = 0; i < json.length; i++) {
    let device = new MedMDevice(
      json[i].address,
      json[i].id,
      json[i].manufacturer,
      json[i].model,
      json[i].modelName,
      json[i].name,
    );
    devices.push(device);
  }

  return devices;
}

// TODO: Fix this to remove duplicated code
export function parseDeviceJson(text: string): HAH_Device {
  let json = JSON.parse(text);

  return new MedMDevice(
    json.address,
    json.id,
    json.manufacturer,
    json.model,
    json.modelName,
    json.name,
  );
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
