import React from 'react';
import {TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import PatientWeightNavCard from '../../Components/NavCards/PatientWeightNavCard';
import PatientBloodPressureNavCard from '../../Components/NavCards/PatientBloodPressureNavCard';
import PatientHeartRateNavCard from '../../Components/NavCards/PatientHeartRateNavCard';
import PatientBloodOxygenNavCard from '../../Components/NavCards/PatientBloodOxygenNavCard';
import MenuNav from '../../Components/NavCards/MenuNav';

export default function PatientMainPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  // Function to navigate to the PatientWeightPage
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
