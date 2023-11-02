import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Switch,
  PermissionsAndroid,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {MedMDeviceConnection} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

export default function DeviceSettingsPage(navigation: any): JSX.Element {
  return (
    <View>
      <Text>Device Setting Page</Text>
      <TouchableOpacity onPress={() => {requestBluetoothScan()}}>
        <Text style={{color: 'black'}}>
          Grant bluetooth connection SCAN
        </Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => {requestBluetoothConnect()}}>
            <Text style={{color: 'black'}}>
                Grant bluetooth connection Connect
            </Text>
        </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Start Scan');
          MedMDeviceConnection.getInstance().startDeviceScan();
        }}>
        <Text style={{color: 'black'}}>Start Scaning for Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const requestBluetoothScan = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestBluetoothConnect = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};