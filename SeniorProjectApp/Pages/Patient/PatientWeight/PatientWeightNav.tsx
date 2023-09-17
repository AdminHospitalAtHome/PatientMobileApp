import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';

export default function PatientWeightNav({handleNavClick}:
    {handleNavClick:() => void}
    
    ): JSX.Element {
    


  return (
    <TouchableOpacity onPress={handleNavClick}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.weightLabel}>Weight</Text>
                </View>
        </View>
    </TouchableOpacity>
    
   
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    box: {
        width: 300, // Adjusted to make it a rectangle
        height: 150, // Adjusted to make it a rectangle
        borderColor: '#333',
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
    },
    weightLabel: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
});

