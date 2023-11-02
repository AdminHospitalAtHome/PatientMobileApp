package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import androidx.annotation.NonNull;

import com.medm.devicekit.BluetoothState;
import com.medm.devicekit.IErrorCallback;
import com.medm.devicekit.NotEnoughPermissionsException;

public class HospitalAtHomeScannerIErrorCallback implements IErrorCallback {
    /**
     * @param e
     */
    @Override
    public void onPermissionsRequired(@NonNull NotEnoughPermissionsException e) {
        Log.e("MedMErrorCallback", e.toString());
        //Log.e("MedMErrorCallback", e.getMessage());
        Log.e("MedMErrorCallback", Integer.toString(e.getRequiredPermissionsStrings().length));
        Log.e("MedMErrorCallback", "permission required:" +  e.getRequiredPermissionsStrings()[0]);

    }

    /**
     * @param bluetoothState
     */
    @Override
    public void onBluetoothTurnedOff(@NonNull BluetoothState bluetoothState) {
        Log.e("MedMErrorCallback", bluetoothState.toString());
    }
}
