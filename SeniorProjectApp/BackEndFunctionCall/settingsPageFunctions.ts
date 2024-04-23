import {PermissionsAndroid} from 'react-native';
import {ReactStorage} from './ReactStorage';

/*
export function setAccessibilityModeOld(
  patientID: number,
  mode: boolean,
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/setAccessibilityMode?PatientID=${patientID}&IfAccessibilityMode=${mode}`,
    ).then(res => {
      if (res.status === 200) {
        resolve('set successful');
      } else {
        reject('failed to set accessibility mode');
      }
    });
  });
}

export function getAccessibilityModeOld(patientID: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getAccessbilityMode?patientID=${patientID}`,
    )
      .then(res => res.json())
      .then(json => {
        if (json.length === 1) {
          resolve(json[0].IfAccessibilityMode);
        } else {
          reject(false);
        }
      })
      .catch(() => {
        // In case of error with fetch, return false
        reject(false);
      });
  });
}
*/
export function getAccessibilityMode(): Promise<boolean> {
  return ReactStorage.getInstance().getAccessibilityMode();
}

export function setAccessibilityMode(mode: boolean): Promise<void> {
  return ReactStorage.getInstance().saveAccessibilityMode(mode);
}

export async function requestBluetoothPermissions() {
  try {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
  } catch (e) {
    console.warn(e);
  }
}
