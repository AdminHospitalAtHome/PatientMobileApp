import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {MedMDeviceConnection} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import React, {useEffect, useState} from 'react';
import {HAH_Device} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {useIsFocused} from '@react-navigation/native';

export default function PairNewDevicePage({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  // noinspection SpellCheckingInspection
  const [pairableDevices, setPairableDevices] = useState<HAH_Device[]>([]);

  const isFocused = useIsFocused();

  // Stop Scan can be called when the scan is already stopped without causing any issues. The reason we have to use the
  // before remove and isFocused is isFocused false only triggers when switching tabs, and beforeRemove only triggers
  // when leaving the page but staying in the same tag.
  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      MedMDeviceConnection.getInstance()
        .stopDeviceScan(setPairableDevices)
        .then();
    });
    if (isFocused) {
      MedMDeviceConnection.getInstance().startDeviceScan(setPairableDevices);
    } else {
      MedMDeviceConnection.getInstance()
        .stopDeviceScan(setPairableDevices)
        .then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.mainView}>
      {pairableDevices.length === 0 && (
        <Text style={styles.NoDevices}>No Device Found</Text>
      )}
      {pairableDevices.map((device: HAH_Device) => {
        return (
          <TouchableOpacity
            key={device.address + '_AbleToPair'}
            style={styles.Device}
            onPress={() => {
              MedMDeviceConnection.getInstance().pair_device(device).then();
            }}>
            <Text style={styles.text}>{'Pair: ' + device.modelName}</Text>
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
    color: 'white',
  },
  Device: {
    backgroundColor: '#ba4618',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  NoDevices: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
});
