import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {AutomaticInputStyles} from './Styles';

export default function ChangeDeviceModal({
  setModalVisible,
  modalVisible,
  setLoadingModalVisible,
  setPreviousModalVisible,
  vitalType,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviousModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  vitalType: VitalType;
}): React.JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  const [devices, setDevices] = useState<HAH_Device[]>([]);
  useEffect(() => {
    connection.paired_device_list_vital(vitalType).then(setDevices);
  }, [connection, vitalType]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={AutomaticInputStyles.centeredView}>
        <View style={AutomaticInputStyles.modalView}>
          <Text style={AutomaticInputStyles.labelText}>Select Device</Text>
          {devices.map((device: HAH_Device) => {
            // Device.name will need to change
            return (
              <View
                style={AutomaticInputStyles.buttonContainer}
                key={device.address}>
                <TouchableOpacity
                  style={AutomaticInputStyles.button}
                  onPress={() => yesOnPress(device.address)}>
                  <View>
                    <View>
                      <Text style={AutomaticInputStyles.deviceLabelText_white}>
                        Device:
                      </Text>
                      <Text style={AutomaticInputStyles.text_white}>
                        {device.modelName}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={AutomaticInputStyles.cancelButtonContainer}>
            <TouchableOpacity
              style={AutomaticInputStyles.button}
              onPress={() => {
                setModalVisible(false);
                setPreviousModalVisible(true);
              }}>
              <Text style={AutomaticInputStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function yesOnPress(address: string): void {
    connection.setDeviceFilter(address).then(() => {
      setModalVisible(false);
      setLoadingModalVisible(true);
    });
  }
}
