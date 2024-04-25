import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {AutomaticInputStyles} from './Styles';

export default function ChooseDeviceModal({
  setModalVisible,
  modalVisible,
  setLoadingModalVisible,
  setChangeDeviceModalVisible,
  vitalType,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeDeviceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  vitalType: VitalType;
}): React.JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  const [deviceName, setDeviceName] = useState('');
  let address = '';

  connection
    .default_paried_device(vitalType)
    .then(res => {
      setDeviceName(res.modelName); // TODO: Maybe change later

      address = res.address;
    })
    .catch(() => setDeviceName('N/A'));

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
          <Text style={AutomaticInputStyles.labelText}>
            Get Data From Device
          </Text>
          <View style={AutomaticInputStyles.textContainer}>
            <Text style={AutomaticInputStyles.deviceLabelText_black}>
              Device:{' '}
            </Text>
            <Text style={AutomaticInputStyles.text_black}>{deviceName}</Text>
          </View>
          <View style={AutomaticInputStyles.editButtonContainer}>
            <TouchableOpacity
              style={AutomaticInputStyles.button}
              onPress={() => {
                setModalVisible(false);
                setChangeDeviceModalVisible(true);
              }}>
              <Text style={AutomaticInputStyles.buttonText}>Change Device</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              AutomaticInputStyles.buttonContainer,
              AutomaticInputStyles.BottomContainer,
            ]}>
            <TouchableOpacity
              style={[
                AutomaticInputStyles.button,
                AutomaticInputStyles.buttonBorder,
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={AutomaticInputStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AutomaticInputStyles.button}
              onPress={yesOnPress}>
              <Text style={AutomaticInputStyles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function yesOnPress(): void {
    connection.setDeviceFilter(address).then(() => {
      setModalVisible(false);
      setLoadingModalVisible(true);
    });
  }
}
