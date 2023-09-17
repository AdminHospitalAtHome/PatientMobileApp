/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// <script src="http://localhost:8097" />;
import React from 'react';
import Login from './Login';
import PatientMainPage from './Pages/Patient/PatientMainPage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'home'} component={Login} />
        <Stack.Screen name={'patientMain'} component={PatientMainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
