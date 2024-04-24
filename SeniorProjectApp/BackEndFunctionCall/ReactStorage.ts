import AsyncStorage from '@react-native-async-storage/async-storage';
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
      try {
        const val = AsyncStorage.getItem(vitalType.valueOf());
        val
          .then(res => {
            if (res !== null) {
              resolve(res);
            } else {
              reject('no device');
            }
          })
          .catch(() => {
            reject('no device');
          });
      } catch (e) {
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

  // Removes any Reference to a device
  public async removeDevice(
    address: string,
    vitalTypes: VitalType[],
  ): Promise<void> {
    return new Promise(resolve => {
      try {
        for (let v of vitalTypes) {
          let tmp = AsyncStorage.getItem(v.valueOf());
          tmp
            .then(defaultAddr => {
              if (defaultAddr !== null && defaultAddr === address) {
                console.log('Removing', v.valueOf());
                AsyncStorage.removeItem(v.valueOf())
                  .catch(() => {
                    console.log('ERROR');
                  })
                  .then();
              }
            })
            .catch();
        }

        resolve();
      } catch {
        resolve();
      }
    });
  }
}
