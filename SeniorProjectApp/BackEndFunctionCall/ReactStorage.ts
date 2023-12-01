import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {VitalType} from './BluetoothAutomaticVitals/DeviceConnection';

export class ReactStorage {
  private static instance: ReactStorage;

  private constructor() {}

  public static getInstance(): ReactStorage {
    if (!ReactStorage.instance) {
      ReactStorage.instance = new ReactStorage();
    }

    return ReactStorage.instance;
  }

  public async saveDefaultDevice(
    address: string,
    vitalType: VitalType,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const val = AsyncStorage.setItem(vitalType.valueOf(), address);
        val
          .then(() => {
            console.log('Saved Vital');
            resolve();
          })
          .catch(() => {
            reject();
          });
      } catch (e) {
        reject();
      }
    });
  }

  public async getDefaultDevice(vitalType: VitalType): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('CALLED LOAD');
      try {
        const val = AsyncStorage.getItem(vitalType.valueOf());
        val
          .then(res => {
            if (res !== null) {
              console.log('Loaded ' + res);
              resolve(res);
            } else {
              console.log('Load Failed');
              reject('no device');
            }
          })
          .catch(() => {
            console.log('Load Failed 1');
            reject('no device');
          });
      } catch (e) {
        console.log(e);
        console.log('Load Failed 2');
        reject('no device');
      }
    });
  }

  public async saveAccessibilityMode(mode: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let tmp = 'false';
        if (mode) {
          tmp = 'true';
        }
        const val = AsyncStorage.setItem('AccessibilityMode?', tmp);
        val.then(() => resolve()).catch(() => reject());
      } catch {
        reject();
      }
    });
  }

  public async getAccessibilityMode(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const val = AsyncStorage.getItem('AccessibilityMode?');
        val
          .then(res => {
            if (res !== null) {
              if (res === 'true') {
                resolve(true);
              } else {
                resolve(false);
              }
            }
          })
          .catch(() => {
            reject(false);
          });
      } catch (e) {
        reject(false);
      }
    });
  }
}
