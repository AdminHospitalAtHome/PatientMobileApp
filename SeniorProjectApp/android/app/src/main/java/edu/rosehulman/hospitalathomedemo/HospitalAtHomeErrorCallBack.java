package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import androidx.annotation.NonNull;

import com.medm.devicekit.BluetoothState;
import com.medm.devicekit.IErrorCallback;
import com.medm.devicekit.NotEnoughPermissionsException;

public class HospitalAtHomeErrorCallBack implements IErrorCallback {
    @Override
    public void onPermissionsRequired(@NonNull NotEnoughPermissionsException e) {
        Log.d("MedMErrorCallback", "Not Enough Permissions");
    }

    @Override
    public void onBluetoothTurnedOff(@NonNull BluetoothState bluetoothState) {
        Log.d("MedMErrorCallback", "Bluetooth Turned off");
    }
}
