import {StyleSheet, View} from 'react-native';

export default function Switch() {
  return (
    <View style={styles.container}>
      <View style={styles.ball} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 28,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
  },
  ball: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 2,
    marginRight: 2,
  },
});
