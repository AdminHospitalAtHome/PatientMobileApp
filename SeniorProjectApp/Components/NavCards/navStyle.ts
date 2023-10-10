import {StyleSheet, Dimensions} from 'react-native';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

export const defaultStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  subContainer: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: 'row',
  },
  label: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export const accessStyle = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  value:{
    fontSize: 90,
    fontWeight: 'bold',
  }
});
