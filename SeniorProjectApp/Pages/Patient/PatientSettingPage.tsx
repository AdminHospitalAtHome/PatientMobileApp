import {View, Text, Dimensions, TouchableOpacity, Switch} from 'react-native';
import {StyleSheet} from 'react-native';

import {useEffect, useState} from 'react';
import {
  getAccessibilityMode,
  requestBluetoothPermissions,
  setAccessibilityMode,
} from '../../BackEndFunctionCall/settingsPageFunctions';
import {useIsFocused} from "@react-navigation/native";

export default function PatientSettingPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const [mode, setMode] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAccessibilityMode().then(res => setMode(res));
  }, [mode]);

  useEffect(() => {
    if (isFocused) {
      // Won't ask if already have bluetooth permissions
      requestBluetoothPermissions();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 13}}>
        <View style={styles.card}>
          <Text style={styles.text}>Accessibility Mode</Text>
          <View style={styles.switchGroup}>
            <TouchableOpacity onPress={switchOnPress}>
              <Switch
                trackColor={{false: '#767577', true: '#75b04c'}}
                onValueChange={switchOnPress}
                value={mode}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('deviceSettingsPage')}>
          <Text style={styles.text}>My Devices</Text>
          <View style={styles.switchGroup}>
            <Text>click</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  function switchOnPress(): void {
    setMode(!mode);
    setAccessibilityMode(!mode);
  }
}

const styles = StyleSheet.create({
  card: {
    width: 0.97 * Dimensions.get('window').width,
    height: 40,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    marginLeft: 10,
  },
});
