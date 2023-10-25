import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import VitalTable from '../VitalTable';

export default function DataModal({
  dataModalVisible,
  setDataModalVisible,
  getVitalData,
  getVitalColumns,
}: {
  dataModalVisible: boolean;
  setDataModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  getVitalData: () => any[][];
  getVitalColumns: () => string[];
}): JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={dataModalVisible}
      onRequestClose={() => {
        setDataModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.labelText}>Get Data From Device</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 10,
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <VitalTable
              columnTitles={getVitalColumns()}
              vitalData={getVitalData()}
            />
          </View>

          <View style={styles.editButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Data</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.BottomContainer]}>
            <TouchableOpacity
              style={[styles.button, styles.buttonBorder]}
              onPress={() => setDataModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addOnPress}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  function addOnPress(): void {
    setDataModalVisible(false);
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
    minHeight: '40%',
    flexDirection: 'column',
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

  editButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#c87525',
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
