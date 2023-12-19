/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import ChatTest3 from './Pages/Patient/Communication/ChatTest3';
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
import ChatTest2 from './Pages/Patient/Communication/ChatTest2';
import ChatContactPage from './Pages/Patient/Communication/ChatContactPage';

<script src="http://locralhost:8097" />;
require('node-libs-react-native/globals');

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
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

function HomeScreenStack(): JSX.Element {
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
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsScreenStack(): JSX.Element {
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
    </SettingsStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();

function ChatScreenStack(): JSX.Element {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={'patientContactPage'}
        component={ChatContactPage}
        options={{title: 'contacts'}}
      />
      <ChatStack.Screen
        name={'test2'}
        component={ChatTest2}
        options={{title: 'user 200000001 (will replace later)'}}
      />
      <ChatStack.Screen
        name={'test3'}
        component={ChatTest3}
        options={{title: 'user 300000001 (will replace later)'}}
      />
    </ChatStack.Navigator>
  );
}

export default App;
