import {StyleSheet, Dimensions} from 'react-native';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

export const defaultStyle = StyleSheet.create({
  container: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10
  },
  labelHolder: {
    flex: 1,
    width: windowWidth * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartHolder: {
    flex: 7,
    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const accessStyle = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
  labelHolder:{
    flex: 2,
    width: windowWidth * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: 30,
  },
  textHolder:{
    flex: 7,
    width: windowWidth * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  value:{
    fontSize: 90,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 50,
    fontWeight: 'bold'
  }
});
