import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import WeightLineChart from "./WeightLineChart";
import {getWeightCall} from "../BackEndFunctionCall/weightFunction";
import getDefaultStartTime from "../BackEndFunctionCall/getDefaultStartTime";

export default function PatientWeightNavCard(): JSX.Element {
  const [weightData, setWeightData] = useState(null);
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const patientID:number = 3;

  useEffect(() => {
    getWeightCall(patientID, startDateTime, stopDateTime).then(response => {
      setWeightData(response);
    });
  }, [stopDateTime]);


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.weightLabel}>Weight</Text>
        <View style={styles.chart}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: 300,
    height: 150,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: 'row',
  },
  weightLabel: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
