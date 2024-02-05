package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.IScannerCallback;

public class HospitalAtHomeScannerCallback  implements IScannerCallback {

    private DeviceManager deviceManager;

    public HospitalAtHomeScannerCallback(DeviceManager deviceManager) {
        this.deviceManager = deviceManager;
    }

    /**
     * @param iDeviceDescription
     */
    @Override
    public void onDeviceFound(IDeviceDescription iDeviceDescription) {
        deviceManager.addPairableDevice(iDeviceDescription);
    }

    /**
     * @param iDeviceDescriptions
     */
    @Override
    public void onAmbiguousDeviceFound(IDeviceDescription[] iDeviceDescriptions) {
        for (IDeviceDescription device : iDeviceDescriptions) {
            Log.d("MedMScannerCallback","Ambigous: " + device.getName());
        }

    }

    /**
     *
     */
    @Override
    public void onScanFinished() {
        Log.d("MedMScannerCallback", "Scan Finished");
    }
}
