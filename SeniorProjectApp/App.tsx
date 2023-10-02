/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
<script src="http://locralhost:8097" />;
import React from 'react';
import Login from './Login';
import PatientMainPage from './Pages/Patient/PatientMainPage';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientWeightPage from './Pages/Patient/PatientWeightPage';
import PatientBloodPressurePage from './Pages/Patient/PatientBloodPressurePage';
import PatientHeartRatePage from './Pages/Patient/PatientHeartRatePage';
import PatientBloodOxygenPage from './Pages/Patient/PatientBloodOxygenPage';
import PatientSettingPage from './Pages/Patient/PatientSettingPage';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    //<View/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'home'}
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name={'patientMain'}
          component={PatientMainPage}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name={'patientWeightPage'}
          component={PatientWeightPage}
          options={{title: 'My Weight'}}
        />
        <Stack.Screen
          name={'patientBloodPressurePage'}
          component={PatientBloodPressurePage}
          options={{title: 'My Blood Pressure'}}
        />
        <Stack.Screen
          name={'patientHeartRatePage'}
          component={PatientHeartRatePage}
          options={{title: 'My Heart Rate'}}
        />
        <Stack.Screen
          name={'patientBloodOxygenPage'}
          component={PatientBloodOxygenPage}
          options={{title: 'My Blood Oxygen'}}
        />
        <Stack.Screen
          name={'patientSettingPage'}
          component={PatientSettingPage}
          options={{title: 'My Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
