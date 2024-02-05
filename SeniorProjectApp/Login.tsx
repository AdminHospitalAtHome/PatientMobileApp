import React, {createContext, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

// const Setting = createContext({
//     accessibility: false
// });

export default function Login({navigation}: {navigation: any}): JSX.Element {
  // const [accessMode, setAccessMode] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        source={require('./Images/newLogo.png')}
        style={styles.logo}
        resizeMethod={'auto'}
      />
      <View>
        <Text style={styles.inputLabel}>Username:</Text>
        <TextInput style={styles.inputBox} />
      </View>
      <View>
        <Text style={styles.inputLabel}>Password: </Text>
        <TextInput secureTextEntry style={styles.inputBox} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Button title={'Signup'} />
        <Button
          title={'Login'}
          onPress={() => navigation.navigate('patientMain')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputLabel: {
    fontSize: 18,
  },
  inputBox: {
    borderRadius: 5,
    width: 230,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {},
  logo: {
    height: 110,
  },
});
