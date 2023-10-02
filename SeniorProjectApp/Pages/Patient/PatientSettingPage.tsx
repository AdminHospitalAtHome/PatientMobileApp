import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import Switch from '../../Components/Switch';

export default function PatientSettingPage(): JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.card}>
        <Text style={{marginLeft: 10}}>Accessibility Mode</Text>
        <View style={styles.switchGroup}>
          <TouchableOpacity>
            <Switch />
          </TouchableOpacity>

          <Text>Off</Text>
        </View>
      </View>
    </View>
  );
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
