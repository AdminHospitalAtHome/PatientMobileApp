import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {MedMDeviceConnection} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import React, {useEffect, useState} from 'react';
import {HAH_Device} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {useIsFocused} from '@react-navigation/native';

export default function DeviceSettingsPage({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [pairedDevices, setPairedDevices] = useState<HAH_Device[]>([]);

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
      {pairedDevices.map((device: HAH_Device) => {
        return (
          <TouchableOpacity
            key={device.address + '_paired'}
            style={styles.Device}
            onPress={() => navigation.navigate('DevicePage', {device: device})}>
            <Text style={styles.text}>{device.modelName}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate('PairNewDevicePage')}>
        <Text style={styles.text}>Pair New Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#c87525',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  mainView: {
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  Device: {
    backgroundColor: '#ba4618',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
});
