import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MedMDeviceConnection} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {VitalType} from '../../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import React from 'react';

export default function DevicePage({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  const {device} = route.params;
  return (
    <View style={Styles.container}>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Name: </Text>
        <Text style={Styles.AttributeText}>{device.name}</Text>
      </View>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Model: </Text>
        <Text style={Styles.AttributeText}>{device.model}</Text>
      </View>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Model Name: </Text>
        <Text style={Styles.AttributeText}>{device.modelName}</Text>
      </View>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Manufacturer: </Text>
        <Text style={Styles.AttributeText}>{device.manufacturer}</Text>
      </View>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Device ID: </Text>
        <Text style={Styles.AttributeText}>{device.id}</Text>
      </View>
      <View style={Styles.AttributeContainer}>
        <Text style={Styles.AttributeLabel}>Device Address: </Text>
        <Text style={Styles.AttributeText}>{device.address}</Text>
      </View>

      {device.vitalType.map((vitalType: VitalType) => {
        return (
          <TouchableOpacity
            key={vitalType.valueOf()}
            style={Styles.ButtonContainer}
            onPress={() => {
              MedMDeviceConnection.getInstance()
                .setDefaultDevice(device.address, vitalType)
                .then();
            }}>
            <Text style={Styles.ButtonText}>
              Set Default {vitalType.valueOf()} Device
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={Styles.DangerButtonContainer}
        onPress={() => {
          MedMDeviceConnection.getInstance()
            .unpair_device(device)
            .then(() => {
              navigation.goBack(null);
            });
        }}>
        <Text style={Styles.DangerButtonText}>Remove This Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AttributeContainer: {
    backgroundColor: '#ba4618',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
  },
  AttributeLabel: {
    fontSize: 20,
    color: 'white',
  },
  AttributeText: {
    fontSize: 15,
    color: 'white',
  },
  ButtonContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
  },
  ButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  DangerButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  DangerButtonContainer: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
  },
});
