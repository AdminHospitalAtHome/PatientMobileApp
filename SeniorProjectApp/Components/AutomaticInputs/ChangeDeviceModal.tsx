import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.labelText}>Select Device</Text>
          {devices.map((device: HAH_Device) => {
            // Device.name will need to change
            return (
              <View style={styles.buttonContainer} key={device.address}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => yesOnPress(device.address)}>
                  <View>
                    <View>
                      <Text style={styles.deviceLabelText}>Device:</Text>
                      <Text style={styles.text}>{device.modelName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                setPreviousModalVisible(true);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
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
    color: 'white',
    fontSize: 20,
  },

  deviceLabelText: {
    color: 'white',
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

  cancelButtonContainer: {
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
