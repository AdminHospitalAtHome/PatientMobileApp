package edu.rosehulman.hospitalathomedemo;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.medm.devicekit.*;
public class MedMDeviceInteraction extends Activity {

    static private MedMDeviceInteraction instance;

    static public MedMDeviceInteraction getInstance() {
        if (instance != null) {
            return instance;
        }
        instance =  new MedMDeviceInteraction();
        return instance;
    }

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d("MedMDeviceInteraction", "Creation");
    }

    protected void onResume() {
        super.onResume();
        try {
            MedMDeviceKit.getCollector().start(
                    new IDataCallback() {
                        public void onNewData(IDeviceDescription source, String readingXML) {
                            // Handle new data
                        }

                        public void onDataCollectionStopped() {  }
                    },
                    null // Don't receive updates on device status change
            );
        } catch (MedMDeviceKitNotInitializedException ex)
        {
            ex.printStackTrace();
        }
    }

    static public String sample() {
        Log.d("MedMDeviceInteraction", "ITS WORKIKNG!!!!");
        return MedMDeviceKit.getVersion();
    }

    public void startScanningForDevices() {
//        Log.d("MedMDeviceIntegration", "Start SCANNN");
//        MedMScanner scanner = MedMDeviceInteraction.getScanner();
//        scanner.setCallback(new HospitalAtHomeScannerCallback());
//        scanner.start();
    }
}