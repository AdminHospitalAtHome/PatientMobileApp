import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
export default ({navigation}: {navigation: any}) => (
  <View style={styles.menuContainer}>
    <TouchableOpacity style={styles.labelContainer}>
      <Text style={styles.labelText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.labelContainer}>
      <Text style={styles.labelText}>Chat</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.labelContainer}>
      <Text style={styles.labelText}>Other</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.labelContainer}
      onPress={() => navigation.navigate('patientSettingPage')}>
      <Text style={styles.labelText}>Setting</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  menuContainer: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#BA4618',
    borderRadius: 3,
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
