package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.IScannerCallback;

public class HospitalAtHomeScannerCallback  implements IScannerCallback {
    /**
     * @param iDeviceDescription
     */
    @Override
    public void onDeviceFound(IDeviceDescription iDeviceDescription) {
        Log.d("MedMScannerCallback","Concrete: " + iDeviceDescription.getName());
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
