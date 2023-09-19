import React from 'react';
import {View} from 'react-native';
import PatientWeightNav from '../../Components/PatientWeightNav';

export default function PatientMainPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  // Function to navigate to the PatientWeightPage
  const handlePatientWeightNavClick = () => {
    navigation.navigate('patientWeightPage');
  };
  return (
    <View>
      <PatientWeightNav
        handleNavClick={handlePatientWeightNavClick}></PatientWeightNav>
    </View>
  );
}
