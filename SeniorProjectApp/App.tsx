/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
<script src="http://localhost:8097" />;
import React from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Image
          source={require('./Images/unionHealthLogo.png')}
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
          <Button title={'Login'} />
        </View>
      </View>
    </NavigationContainer>
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

export default App;
