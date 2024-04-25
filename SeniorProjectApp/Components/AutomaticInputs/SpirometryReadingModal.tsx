import React, {useEffect} from 'react';
import {HAH_Device_Connection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {AutomaticInputStyles} from './Styles';

export default function SpirometryReadingModal({
  setReadingModalVisible,
  readingModalVisible,
  sendToServer,
}: {
  setReadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  readingModalVisible: boolean;
  sendToServer: (data: string[]) => Promise<void>;
}): React.JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

  useEffect(() => {
    if (readingModalVisible) {
      connection.startCollector(setReadingModalVisible, sendToServer);
    }
    // We do not want this code to run when any dependency changes, only when loadingModalVisible Changes. Thus, we suppressed ESLINT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readingModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={readingModalVisible}
      onRequestClose={() => {
        setReadingModalVisible(false);
      }}>
      <View style={AutomaticInputStyles.centeredView}>
        <View style={AutomaticInputStyles.modalView}>
          <Text style={AutomaticInputStyles.labelText}>
            Reading From Device...
          </Text>
          <Text style={AutomaticInputStyles.text_black}>
            Please take three readings on your spirometry device. This window
            will disappear when the readings are received.
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
    setReadingModalVisible(false);
    connection.stopCollector().finally();
  }
}
