import {HAH_Device, HAH_Device_Connection} from './DeviceConnection';

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
  ): Record<string, any>[] {
    return [{}];
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

export function parseXMLWeightData(xml: string): Record<string, any>[] {
  return [{}];
}

export function parseXMLHeartRateData(xml: string): Record<string, any>[] {
  return [{}];
}

export function parseXMLBloodPressureData(xml: string): Record<string, any>[] {
  return [{}];
}

export function parseXMLBloodOxygenData(xml: string): Record<string, any>[] {
  return [{}];
}
