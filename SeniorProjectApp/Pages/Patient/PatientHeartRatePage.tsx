import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import {getHeartRate} from '../../BackEndFunctionCall/heartRateFunction';
import {Row, Rows, Table} from 'react-native-table-component';
export default function PatientHeartRatePage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState<String>('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [invalidVisible, setInvalidVisible] = useState(false);
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [heartData, setHeartData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

  const patientID = 3;

  useEffect(() => {
    getHeartRate(patientID, startDateTime, stopDateTime).then(setHeartData);
    console.log(stopDateTime);
  }, [stopDateTime]);

  return (
    <ScrollView style={styles.container}>
      <Text>Patient Heart Rate Page</Text>
      <View style={{flexDirection: 'row'}}>
        <Button
          title={'Day'}
          onPress={() => {
            var startDateTimeTemp = new Date();
            startDateTimeTemp.setHours(0, 0, 0, 0);
            setStartDateTime(startDateTimeTemp.toISOString());
            setStopDateTime(new Date().toISOString());
          }}
        />
        <Button
          title={'Week'}
          onPress={(): void => {
            const startDateTimeTemp = new Date();
            startDateTimeTemp.setHours(0, 0, 0, 0);
            startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 7);
            console.log(startDateTimeTemp.toISOString());
            setStartDateTime(startDateTimeTemp.toISOString());
            setStopDateTime(new Date().toISOString());
          }}
        />
        <Button
          title={'Month'}
          onPress={(): void => {
            const startDateTimeTemp = new Date();
            startDateTimeTemp.setHours(0, 0, 0, 0);
            startDateTimeTemp.setDate(startDateTimeTemp.getDate() - 31);
            console.log(startDateTimeTemp.toISOString());
            setStartDateTime(startDateTimeTemp.toISOString());
            setStopDateTime(new Date().toISOString());
          }}
        />
      </View>
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={['Date', 'Time', 'Heart Rate']} />
          <Rows data={heartData} />
        </Table>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button title={'Add Manually'} onPress={() => setModalVisible(true)} />
        <Button title={'Add automatically'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});
