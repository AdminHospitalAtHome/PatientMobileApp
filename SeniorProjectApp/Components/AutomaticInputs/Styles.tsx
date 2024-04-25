import {StyleSheet} from 'react-native';

export const AutomaticInputStyles = StyleSheet.create({
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
  labelText: {
    color: 'black',
    fontSize: 25,
    marginBottom: 10,
  },
  textContainer: {
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 'auto',
    marginLeft: 5,
  },
  text_black: {
    color: 'black',
    fontSize: 20,
  },

  text_white: {
    color: 'white',
    fontSize: 20,
  },

  deviceLabelText_black: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  deviceLabelText_white: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#ba4618',
    padding: 5,
    borderRadius: 10,

    justifyContent: 'space-around',
  },



  editButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#c87525',
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },

  cancelButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#c87525',
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },

  button: {
    flex: 1,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },

  buttonBorder: {
    borderColor: 'white',
    borderRightWidth: 2,
  },

  BottomContainer: {
    marginTop: 15,
  },
});
