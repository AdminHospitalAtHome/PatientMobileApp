import React from 'react';
import {TouchableOpacity, ScrollView, SafeAreaView, View} from 'react-native';
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
    <View style={{flex: 1}}>
      <View style={{flex: 13}}>
        <ScrollView contentContainerStyle={{alignItems: 'center', padding: 5}}>
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
      </View>
      <View style={{flex: 1}}>
        <MenuNav navigation={navigation} />
      </View>
    </View>
  );
}
