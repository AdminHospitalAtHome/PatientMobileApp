export interface HAH_Device_Connection {
  register: (license_key: string) => Promise<void>;
  pairable_device_list: () => HAH_Device[]; //first string: id, second string: name
  paired_device_list: () => HAH_Device[]; //first string: id, second string: name
  pair_device: (device: HAH_Device) => Promise<void>;
  unpair_device: (device: HAH_Device) => Promise<void>;
  get_data: (
    id: number,
    parse: (xml: string) => Promise<Record<string, any>[]>,
  ) => Promise<Record<string, any>[]>;
}

export interface HAH_Device {
  address: string;
  id: number;
  manufacturer: string;
  modelName: string;
  name: string;
}
