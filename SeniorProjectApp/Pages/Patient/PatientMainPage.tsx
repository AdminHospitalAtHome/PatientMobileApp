import React from 'react';
import {TouchableOpacity, ScrollView, View, StyleSheet} from 'react-native';
import PatientWeightNavCard from '../../Components/NavCards/PatientWeightNavCard';
import PatientBloodPressureNavCard from '../../Components/NavCards/PatientBloodPressureNavCard';
import PatientHeartRateNavCard from '../../Components/NavCards/PatientHeartRateNavCard';
import PatientBloodOxygenNavCard from '../../Components/NavCards/PatientBloodOxygenNavCard';
import PatientSpirometryNavCard from '../../Components/NavCards/PatientSpirometryNavCard';

export default function PatientMainPage({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  // Function to navigate to the PatientWeightPage
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('patientSpirometryPage')}>
            <PatientSpirometryNavCard />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 13,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 5,
  },
});
