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

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          requestBluetoothScan();
        }}>
        <Text style={{color: 'black'}}>Grant bluetooth connection SCAN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          requestBluetoothConnect();
        }}>
        <Text style={{color: 'black'}}>Grant bluetooth connection Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          console.log('Start Scan');
          MedMDeviceConnection.getInstance().startDeviceScan(
            setPairableDevices,
          );
        }}>
        <Text style={{color: 'black'}}>Start Scaning for Device</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          console.log('Stop Scan');
          MedMDeviceConnection.getInstance()
            .stopDeviceScan(setPairableDevices)
            .then(res =>
              console.log('Stopping Was Success? ' + res.toString()),
            );
        }}>
        <Text style={{color: 'black'}}>Stop device scan</Text>
      </TouchableOpacity>

      <Text style={{color: 'black'}}>Parable Devices</Text>

      {pairableDevices.map((device: HAH_Device, index: number) => {
        return (
          <TouchableOpacity
            style={styles.Device}
            onPress={() => navigation.navigate('DevicePage')}>
            <Text style={styles.text}>{'Pair to ' + device.name}</Text>
          </TouchableOpacity>
        );
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

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'yellow',
    margin: 10,
    padding: 10,
  },
  mainView: {
    margin: 10,
  },
    text:{
      textAlign: 'center',
    },
  Device: {
    backgroundColor: '#ba4618',
    borderRadius: 10,
    padding: 10,
  },
});
