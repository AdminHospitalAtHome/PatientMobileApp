import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {
  MedMDevice,
  MedMDeviceConnection,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

export default function LoadingModal({
  setLoadingModalVisible,
  loadingModalVisible,
    sendToServer,
}: {
  setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loadingModalVisible: boolean;
  sendToServer: (data: string[]) => Promise<void>;
}): JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();

  useEffect(() => {
    if (loadingModalVisible) {
      connection.startCollector(setLoadingModalVisible, sendToServer);
    }
  }, [loadingModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loadingModalVisible}
      onRequestClose={() => {
        setLoadingModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.labelText}>Loading From Device...</Text>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={cancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function cancel(): void {
    setLoadingModalVisible(false);
    connection.stopCollector();
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  labelText: {
    color: 'black',
    fontSize: 25,
    marginBottom: 10,
  },
  textContainer: {
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 'auto',
    marginLeft: 5,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },

  deviceLabelText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,

    justifyContent: 'space-around',
  },

  editButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#c87525',
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },

  buttonBorder: {
    borderColor: 'white',
    borderRightWidth: 2,
  },

  BottomContainer: {
    marginTop: 15,
  },
});
