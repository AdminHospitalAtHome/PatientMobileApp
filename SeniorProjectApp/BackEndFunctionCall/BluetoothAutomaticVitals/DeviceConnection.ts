export interface HAH_Device_Connection {
  pairable_device_list: () => HAH_Device[]; //first string: id, second string: name
  paired_device_list: () => HAH_Device[]; //first string: id, second string: name
  default_paried_device: (vital: VitalType) => Promise<HAH_Device>;
  pair_device: (device: HAH_Device) => Promise<void>;
  unpair_device: (device: HAH_Device) => Promise<void>;
  get_data: (
    id: number,
    parse: (xml: string) => Promise<Record<string, any>[]>,
  ) => Promise<Record<string, any>[]>;
  startDeviceScan: () => void;
}

export interface HAH_Device {
  address: string;
  id: number;
  manufacturer: string;
  modelName: string;
  name: string;
}

export enum VitalType{
  WEIGHT,
  BLOOD_PRESSURE,
  BLOOD_OXYGEN,
  HEART_RATE
}