import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import PatientWeightNavCard from '../../Components/PatientWeightNavCard';
import PatientBloodPressureNavCard from '../../Components/PatientBloodPressureNavCard';
import PatientHeartRateNavCard from '../../Components/PatientHeartRateNavCard';
import PatientBloodOxygenNavCard from '../../Components/PatientBloodOxygenNavCard';
import MenuNav from '../../Components/MenuNav';

export default function PatientMainPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  // Function to navigate to the PatientWeightPage
  return (
    <View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('patientWeightPage')}>
          <PatientWeightNavCard />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('patientBloodPressurePage')}>
          <PatientBloodPressureNavCard />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('patientHeartRatePage')}>
          <PatientHeartRateNavCard />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('patientBloodOxygenPage')}>
          <PatientBloodOxygenNavCard />
        </TouchableOpacity>
      </ScrollView>
      <MenuNav navigation={navigation} />
    </View>
  );

}
