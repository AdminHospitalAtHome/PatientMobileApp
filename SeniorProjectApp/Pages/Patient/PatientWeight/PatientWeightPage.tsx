import React from 'react';
import {View,ScrollView, Button, Text} from 'react-native';
import {useState, useEffect} from 'react';

export default function PatientWeightPage(): JSX.Element {
  return (
    <ScrollView>
      <Text>Patient Weight Page</Text>
      <View>
        <Button title={'Add Manually'} />
        <Button title={'Add automatically'} />
      </View>
    </ScrollView>
  );
}
