import {PermissionsAndroid} from 'react-native';
import {ReactStorage} from './ReactStorage';

export function getAccessibilityMode(): Promise<boolean> {
  return ReactStorage.getInstance().getAccessibilityMode();
}

export function setAccessibilityMode(mode: boolean): Promise<void> {
  return ReactStorage.getInstance().saveAccessibilityMode(mode);
}

export async function requestBluetoothPermissions() {
  try {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
  } catch (e) {
    console.warn(e);
  }
}
