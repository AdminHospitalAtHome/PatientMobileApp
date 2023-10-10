import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import Switch from '../../Components/Switch';
import {useState} from 'react';
import {getAccessibilityMode} from '../../BackEndFunctionCall/userInfo';

export default function PatientSettingPage(): JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  getAccessibilityMode(300000001).then(res => setAccessibilityMode(res[0].IfAccessibilityMode));

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
      <View style={styles.card}>
        <Text style={{marginLeft: 10}}>Accessibility Mode</Text>
        <View style={styles.switchGroup}>
          <TouchableOpacity onPress={switchOnPress}>
            <Switch mode={accessibilityMode} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function switchOnPress(): void {
    setAccessibilityMode(!accessibilityMode);
    //call function here
  }
}

const styles = StyleSheet.create({
  card: {
    width: 0.97 * Dimensions.get('window').width,
    height: 40,
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
});
