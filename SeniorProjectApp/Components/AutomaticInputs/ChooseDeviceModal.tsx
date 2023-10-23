import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {MedMDeviceConnection} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

export default function ChooseDeviceModal({
  setModalVisible,
  modalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<any>>;
  modalVisible: boolean;
}): JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  let device_name: string = '';
  const [deviceName, setDeviceName] = useState('');

  connection
    .default_paried_device(VitalType.WEIGHT)
    .then(res => {
      setDeviceName(res.name);
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.labelText}>Get Data From Device</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Device: </Text>
            <Text style={styles.text}>{deviceName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Change Device</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.BottomContainer]}>
            <TouchableOpacity style={[styles.button, styles.buttonBorder]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
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
    fontSize: 20,
  },
  textContainer: {
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,

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
