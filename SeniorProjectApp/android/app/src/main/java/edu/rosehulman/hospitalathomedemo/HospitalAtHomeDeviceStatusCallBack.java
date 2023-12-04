package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.IDeviceStatusCallback;
import com.medm.devicekit.OperationStatus;

public class HospitalAtHomeDeviceStatusCallBack implements IDeviceStatusCallback {
    private DeviceManager manager;

    public HospitalAtHomeDeviceStatusCallBack(DeviceManager manager){
        this.manager = manager;
    }
    @Override
    public void onConnected(IDeviceDescription iDeviceDescription) {
        Log.d("MedMStatusCallback", "Status: " + iDeviceDescription.getAddress());
    }

    @Override
    public void onDisconnected(IDeviceDescription iDeviceDescription, OperationStatus operationStatus, String s) {
        Log.d("MedMStatusCallback", "Status callback disconnected: " + iDeviceDescription.getAddress() + ", operation status: "+operationStatus.toString() + ", string: "+s);
        manager.automaticStopCollector();
    }
}
