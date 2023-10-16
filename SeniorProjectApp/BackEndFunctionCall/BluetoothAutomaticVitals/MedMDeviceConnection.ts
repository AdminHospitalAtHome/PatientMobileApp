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
    parse: (xml: string) => Record<string, any>,
  ): Record<string, any> {
    return {};
  }
}
