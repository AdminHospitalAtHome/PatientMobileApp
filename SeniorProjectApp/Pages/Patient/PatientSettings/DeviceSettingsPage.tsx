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
import {useIsFocused} from '@react-navigation/native';

export default function DeviceSettingsPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const [pairableDevices, setPairableDevices] = useState(
    new Array<HAH_Device>(),
  );
  const [pairedDevices, setPairedDevices] = useState(new Array<HAH_Device>());

  const isFocused = useIsFocused();

  useEffect(() => {
    MedMDeviceConnection.getInstance()
      .paired_device_list()
      .then(res => {
        setPairedDevices(res);
      });
  }, [isFocused]);

  return (
    <View style={styles.mainView}>
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

      <Text style={{color: 'black'}}>Paired Devices</Text>

      {pairedDevices.map((device: HAH_Device) => {
        return (
          <TouchableOpacity
            style={styles.Device}
            onPress={() => navigation.navigate('DevicePage', {device: device})}>
            <Text style={styles.text}>{'View Data Of: ' + device.name}</Text>
          </TouchableOpacity>
        );
      })}

      <Text style={{color: 'black'}}>Pairable Devices</Text>

      {pairableDevices.map((device: HAH_Device) => {
        return (
          <TouchableOpacity
            style={styles.Device}
            onPress={() =>
              navigation.navigate('DevicePage', {
                device: device,
                setPairedDevices: setPairedDevices,
              })
            }>
            <Text style={styles.text}>{'Pair to ' + device.modelName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'yellow',
    margin: 10,
    padding: 10,
  },
  mainView: {
    margin: 10,
  },
  text: {
    textAlign: 'center',
  },
  Device: {
    backgroundColor: '#ba4618',
    borderRadius: 10,
    padding: 10,
  },
});
