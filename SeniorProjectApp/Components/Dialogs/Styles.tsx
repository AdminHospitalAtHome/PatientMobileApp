import {StyleSheet} from 'react-native';

export const AddDialogStyle = StyleSheet.create({
  modalText: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 10,
    borderRadius: 10,

    justifyContent: 'space-around',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
