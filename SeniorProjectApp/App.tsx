/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import PatientMainPage from './Pages/Patient/PatientMainPage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientWeightPage from './Pages/Patient/PatientDetailPages/PatientWeightPage';
import PatientBloodPressurePage from './Pages/Patient/PatientDetailPages/PatientBloodPressurePage';
import PatientHeartRatePage from './Pages/Patient/PatientDetailPages/PatientHeartRatePage';
import PatientSettingPage from './Pages/Patient/PatientSettingPage';
import DeviceSettingsPage from './Pages/Patient/PatientSettings/DeviceSettingsPage';
import DevicePage from './Pages/Patient/PatientSettings/DevicePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatContactPage from './Pages/Patient/Communication/ChatContactPage';
import PatientBloodOxygenPage from './Pages/Patient/PatientDetailPages/PatientBloodOxygenPage';
import PairNewDevicePage from './Pages/Patient/PatientSettings/PairNewDevicePage';
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {AzureChatPage} from './Pages/Patient/Communication/AzureChatPage';
import PatientSpirometryPage from './Pages/Patient/PatientDetailPages/PatientSpirometryPage';
// import window from "./__mocks__/window";

// This prevents a warning we get by passing the chat threadClient in ChatContactPage as a parameter to AzureChatPage.
// We can safely ignore it because we do not use state-persistence or deep linking.
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'new NativeEventEmitter()',
]);

// For Debugging?
<script src="http://localhost:8097" />;
require('node-libs-react-native/globals');

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {fontSize: 20},
        }}>
        <Tab.Screen name={'Home'} component={HomeScreenStack} />
        <Tab.Screen name={'Chat'} component={ChatScreenStack} />
        <Tab.Screen name={'Settings'} component={SettingsScreenStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeScreenStack(): React.JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'patientMain'}
        component={PatientMainPage}
        options={{title: 'Home'}}
      />
      <HomeStack.Screen
        name={'patientWeightPage'}
        component={PatientWeightPage}
        options={{title: 'My Weight'}}
      />
      <HomeStack.Screen
        name={'patientBloodPressurePage'}
        component={PatientBloodPressurePage}
        options={{title: 'My Blood Pressure'}}
      />
      <HomeStack.Screen
        name={'patientHeartRatePage'}
        component={PatientHeartRatePage}
        options={{title: 'My Heart Rate'}}
      />
      <HomeStack.Screen
        name={'patientBloodOxygenPage'}
        component={PatientBloodOxygenPage}
        options={{title: 'My Blood Oxygen'}}
      />
      <HomeStack.Screen
        name={'patientSpirometryPage'}
        component={PatientSpirometryPage}
        options={{title: 'My Spirometry'}}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsScreenStack(): React.JSX.Element {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={'patientSettingPage'}
        component={PatientSettingPage}
        options={{title: 'My Settings'}}
      />
      <SettingsStack.Screen
        name={'deviceSettingsPage'}
        component={DeviceSettingsPage}
        options={{title: 'My Devices'}}
      />
      <SettingsStack.Screen
        name={'DevicePage'}
        component={DevicePage}
        options={{title: 'Device'}}
      />
      <SettingsStack.Screen
        name={'PairNewDevicePage'}
        component={PairNewDevicePage}
        options={{title: 'Pair New Device'}}
      />
    </SettingsStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();

function ChatScreenStack(): React.JSX.Element {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={'patientContactPage'}
        component={ChatContactPage}
        options={{title: 'contacts'}}
      />
      <ChatStack.Screen
        name={'azureChatPage'}
        component={AzureChatPage}
        options={{title: 'Your Chat'}}
      />
    </ChatStack.Navigator>
  );
}

export default App;
