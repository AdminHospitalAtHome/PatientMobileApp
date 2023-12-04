/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import ChatPage from './Pages/ChatPage';
import ChatContactPage from './Pages/Patient/ChatContactPage';
import ChatTest from './Pages/Patient/ChatTest';

<script src="http://locralhost:8097" />;

import React from 'react';
import Login from './Login';
import PatientMainPage from './Pages/Patient/PatientMainPage';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientWeightPage from './Pages/Patient/PatientDetailPages/PatientWeightPage';
import PatientBloodPressurePage from './Pages/Patient/PatientDetailPages/PatientBloodPressurePage';
import PatientHeartRatePage from './Pages/Patient/PatientDetailPages/PatientHeartRatePage';
import PatientBloodOxygenPage from './Pages/Patient/PatientDetailPages/PatientBloodOxygenPage';
import PatientSettingPage from './Pages/Patient/PatientSettingPage';
import DeviceSettingsPage from './Pages/Patient/PatientSettings/DeviceSettingsPage';
import DevicePage from './Pages/Patient/PatientSettings/DevicePage';
import MenuNav from './Components/NavCards/MenuNav';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
        name={'patientChatPage'}
        component={ChatContactPage}
        options={{title: 'My Contacts'}}
      />
      <ChatStack.Screen
        name={'contact1'}
        component={ChatPage}
        options={{title: 'First1 Last1(Provider)'}}
      />
      <ChatStack.Screen
        name={'test'}
        component={ChatTest}
        options={{title: 'azure function test'}}
      />
    </ChatStack.Navigator>
  );
}

export default App;
