import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Switch,
  PermissionsAndroid,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  MedMDevice,
  MedMDeviceConnection,
} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {useEffect, useState} from 'react';
import {HAH_Device} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';

export default function DeviceSettingsPage(navigation: any): JSX.Element {
  const [pairableDevices, setPairableDevices] = useState(
    new Array<HAH_Device>(),
  );

  // alternates between true and false everytime a new device is found
  const [newDeviceAvailable, setNewDeviceAvailable] = useState(false);

  useEffect(() => {
    // TODO: Fix Typescirpt error later
    setPairableDevices(MedMDeviceConnection.getInstance().pairable_device_list);
  }, [newDeviceAvailable]);

  return (
    <View>
      <Text>Device Setting Page</Text>
      <TouchableOpacity
        onPress={() => {
          requestBluetoothScan();
        }}>
        <Text style={{color: 'black'}}>Grant bluetooth connection SCAN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          requestBluetoothConnect();
        }}>
        <Text style={{color: 'black'}}>Grant bluetooth connection Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Start Scan');
          MedMDeviceConnection.getInstance().startDeviceScan(
            setNewDeviceAvailable,
          );
        }}>
        <Text style={{color: 'black'}}>Start Scaning for Device</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('Stop Scan');
          MedMDeviceConnection.getInstance()
            .stopDeviceScan()
            .then(res =>
              console.log('Stopping Was Success? ' + res.toString()),
            );
        }}>
        <Text style={{color: 'black'}}>Stop device scan</Text>
      </TouchableOpacity>
      <Text style={{color: 'black'}}>Pariable Devices</Text>
      {pairableDevices.map((device: HAH_Device, index: number) => {
        return <Text>{device.address}</Text>;
      })}
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
