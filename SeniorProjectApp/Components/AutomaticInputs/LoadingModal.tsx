import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {HAH_Device_Connection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {AutomaticInputStyles} from './Styles';

export default function LoadingModal({
  setLoadingModalVisible,
  loadingModalVisible,
  sendToServer,
}: {
  setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loadingModalVisible: boolean;
  sendToServer: (data: string[]) => Promise<void>;
}): React.JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

  useEffect(() => {
    if (loadingModalVisible) {
      connection.startCollector(setLoadingModalVisible, sendToServer);
    }
    // We do not want this code to run when any dependency changes, only when loadingModalVisible Changes. Thus, we suppressed ESLINT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loadingModalVisible}
      onRequestClose={() => {
        setLoadingModalVisible(false);
      }}>
      <View style={AutomaticInputStyles.centeredView}>
        <View style={AutomaticInputStyles.modalView}>
          <Text style={AutomaticInputStyles.labelText}>
            Loading From Device...
          </Text>
          <View style={AutomaticInputStyles.editButtonContainer}>
            <TouchableOpacity
              style={AutomaticInputStyles.button}
              onPress={cancel}>
              <Text style={AutomaticInputStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function cancel(): void {
    setLoadingModalVisible(false);
    connection.stopCollector().finally();
  }
}
