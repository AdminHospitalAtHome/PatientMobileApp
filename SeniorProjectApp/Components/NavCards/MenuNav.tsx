import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import PatientMainPage from '../../Pages/Patient/PatientMainPage';
import ChatPage from '../../Pages/ChatPage';
import PatientSettingPage from '../../Pages/Patient/PatientSettingPage';

export default function MenuNav(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name={'home'} component={PatientMainPage} />
        <Tab.Screen name={'chat'} component={ChatPage} />
        <Tab.Screen name={'settings'} component={PatientSettingPage} />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  menuContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: '#BA4618',
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    fontSize: 20,
  },
});
