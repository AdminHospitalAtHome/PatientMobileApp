package edu.rosehulman.hospitalathomedemo;

import android.bluetooth.BluetoothClass;

import com.medm.devicekit.IAddDeviceCallback;
import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.OperationStatus;

public class HospitalAtHomeAddDeviceCallback implements IAddDeviceCallback {
    DeviceManager dm;
    public HospitalAtHomeAddDeviceCallback(DeviceManager deviceManager) {
        this.dm = deviceManager;
    }

    /**
     * @param iDeviceDescription
     */
    @Override
    public void onSuccess(IDeviceDescription iDeviceDescription) {
        dm.onDevicePair(true, iDeviceDescription);
    }

    /**
     * @param iDeviceDescription
     * @param operationStatus
     * @param s
     */
    @Override
    public void onFailure(IDeviceDescription iDeviceDescription, OperationStatus operationStatus, String s) {
        dm.onDevicePair(false, iDeviceDescription);
    }
}
