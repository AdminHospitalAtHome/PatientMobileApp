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
    sendToServer: (data: string[]) => Promise<void>,
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
  vitalType: VitalType[];
}

export enum VitalType {
  // This is to keep it from flagging ESLint Errors for all the vitals we have not used.
  // noinspection JSUnusedGlobalSymbols
  WEIGHT = 'Weight',
  ACTIVITY = 'Activity',
  BLOOD_COAGULATION = 'BloodCoagulation',
  BLOOD_PRESSURE = 'BloodPressure',
  CHOLESTEROL = 'Cholesterol',
  ECG = 'ECG',
  EXERCISE = 'Exercise',
  FETAL_DOPPLER = 'Fetaldoppler',
  GLUCOSE = 'Glucose',
  HEART_RATE = 'HeartRate',
  KETONE = 'Ketone',
  LACTATE = 'Lactate',
  MEDICATION_IN = 'MedicationIn',
  NOTE = 'Note',
  BLOOD_OXYGEN = 'Oxygen',
  RESPIRATION_RATE = 'RespirationRate',
  SLEEP = 'Sleep',
  SPIROMETRY = 'Spirometry',
  TEMPERATURE = 'Temperature',
  URIC_ACID = 'UricAcid',
  NOT_DEFINED = 'NotDefined',
}

export class VitalTypeUtilities {
  public static fromString(vitalType: string): VitalType {
    switch (vitalType) {
      case 'Weight':
        return VitalType.WEIGHT;
      case 'Activity':
        return VitalType.ACTIVITY;
      case 'BloodCoagulation':
        return VitalType.BLOOD_COAGULATION;
      case 'BloodPressure':
        return VitalType.BLOOD_PRESSURE;
      case 'Cholesterol':
        return VitalType.CHOLESTEROL;
      case 'ECG':
        return VitalType.ECG;
      case 'Exercise':
        return VitalType.EXERCISE;
      case 'Fetaldoppler':
        return VitalType.FETAL_DOPPLER;
      case 'Glucose':
        return VitalType.GLUCOSE;
      case 'HeartRate':
        return VitalType.HEART_RATE;
      case 'Ketone':
        return VitalType.KETONE;
      case 'Lactate':
        return VitalType.LACTATE;
      case 'MedicationIn':
        return VitalType.MEDICATION_IN;
      case 'Note':
        return VitalType.NOTE;
      case 'Oxygen':
        return VitalType.BLOOD_OXYGEN;
      case 'RespirationRate':
        return VitalType.RESPIRATION_RATE;
      case 'Sleep':
        return VitalType.SLEEP;
      case 'Spirometry':
        return VitalType.SPIROMETRY;
      case 'Temperature':
        return VitalType.TEMPERATURE;
      case 'UricAcid':
        return VitalType.URIC_ACID;
      default:
        return VitalType.NOT_DEFINED;
    }
  }
}
