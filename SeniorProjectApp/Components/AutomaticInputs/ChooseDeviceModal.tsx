import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  HAH_Device,
  HAH_Device_Connection,
  VitalType,
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/DeviceConnection';
import {
  MedMDevice,
  MedMDeviceConnection
} from '../../BackEndFunctionCall/BluetoothAutomaticVitals/MedMDeviceConnection';

export default function ChooseDeviceModal({
  setModalVisible,
  modalVisible,
  setLoadingModalVisible,
    vitalType,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setLoadingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  vitalType: VitalType;
}): JSX.Element {
  const connection: HAH_Device_Connection = MedMDeviceConnection.getInstance();
  const [deviceName, setDeviceName] = useState('');
  let address = "";

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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.labelText}>Get Data From Device</Text>
          <View style={styles.textContainer}>
            <Text style={styles.deviceLabelText}>Device: </Text>
            <Text style={styles.text}>{deviceName}</Text>
          </View>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Change Device</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.BottomContainer]}>
            <TouchableOpacity
              style={[styles.button, styles.buttonBorder]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={yesOnPress}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function yesOnPress(): void {
    connection.setDeviceFilter(address).then(()=> {

      setModalVisible(false);
      setLoadingModalVisible(true);
    });


    //TODO: Temporary REMOVE!!!!

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
