import React from 'react';

export interface HAH_Device_Connection {
  pairable_device_list: () => Promise<HAH_Device[]>; //first string: id, second string: name
  paired_device_list: () => Promise<HAH_Device[]>; //first string: id, second string: name
  default_paried_device: (vital: VitalType) => Promise<HAH_Device>;
  pair_device: (device: HAH_Device, navigation: any) => Promise<void>;
  unpair_device: (device: HAH_Device) => Promise<void>;
  get_data: (
    id: number,
    parse: (xml: string) => Promise<Record<string, any>[]>,
  ) => Promise<Record<string, any>[]>;
  startDeviceScan: (
    setPairableDevices: React.Dispatch<React.SetStateAction<HAH_Device[]>>,
  ) => void;
  stopDeviceScan: (
    setPairableDevices: React.Dispatch<React.SetStateAction<HAH_Device[]>>,
  ) => Promise<Boolean>;

  setDefaultDevice: (address: string, vitalType: VitalType) => Promise<void>;

  setDeviceFilter: (address: string) => Promise<void>;

  startCollector: (
    setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setDataModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  stopCollector: () => Promise<boolean>;

  getCollectedData: () => string[];
}

export interface HAH_Device {
  address: string;
  id: string;
  manufacturer: string;
  model: string;
  modelName: string;
  name: string;
}

export enum VitalType {
  WEIGHT = 'Weight',
  ACTIVITY = 'Activity',
  BLOOD_COAGULATION = 'BloodCoagulation',
  BLOOD_PRESSURE = 'BloodPressure',
  COLESTEROL = 'Cholesterol',
  ECG = 'ECG',
  EXERCISE = 'Exercise',
  FETAL_DOPPLER = 'Fetaldoppler',
  GLUCOSE = 'Glucose',
  HEART_RATE = 'HeartRate',
  KETONE = 'Ketone',
  LACTATE = 'Lactate',
  MEDICATION_IN = 'MedicationIn',
  NOTE = 'Note',
  BLOOOD_OXYGEN = 'Oxygen',
  RESPIRTION_RATE = 'RespirationRate',
  SLEEP = 'Sleep',
  SPIROMETRY = 'Spirometry',
  TEMPERATURE = 'Tempature',
  URIC_ACID = 'UricAcid',
}
