package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.IScannerCallback;

import java.util.Set;

public class HospitalAtHomeScannerCallback  implements IScannerCallback {

    private MedMDeviceManager deviceManager;

    public HospitalAtHomeScannerCallback(MedMDeviceManager deviceManager) {
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
