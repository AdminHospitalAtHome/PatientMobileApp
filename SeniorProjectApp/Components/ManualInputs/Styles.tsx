import {StyleSheet} from 'react-native';

export const ManualTextInputStyle = StyleSheet.create({
  modalText: {
    marginBottom: 5,
    fontSize: 25,
    textAlign: 'center',
  },

  inputUnit: {
    fontSize: 25,
  },
  invalidInput: {
    color: 'red',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 5,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});

export const MultiTextInputStyle = StyleSheet.create({
  modalUnitText: {
    fontSize: 25,
  },
  inputBorder: {
    borderBottomWidth: 3,
    borderColor: '#ba4618',
  },

  modalLabel: {
    marginTop: 10,
    fontSize: 18,
    color: 'grey',
    alignItems: 'flex-start',
  },
});

export const InputManualModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  pressableBorder: {
    borderColor: 'white',
    borderLeftWidth: 2,
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
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,

    justifyContent: 'space-around',
  },
});
