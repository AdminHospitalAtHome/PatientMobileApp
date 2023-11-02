package edu.rosehulman.hospitalathomedemo;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.medm.devicekit.*;

public class MedMDeviceManager extends ReactContextBaseJavaModule {
    private ReactApplicationContext context;

    MedMDeviceManager(ReactApplicationContext context) {
        super(context);
        this.context = context;

    }

    @Override
    public String getName() {
        return "MedMDeviceManager";
    }

    @ReactMethod
    public void testMedM(Promise promise){
       promise.resolve(MedMDeviceInteraction.getInstance().sample());
    }

    @ReactMethod
    public void startDeviceScan() {
        Log.d("MedMDeviceManager", "Start Scan");

        if (MedMDeviceKit.isInitialized()) {
            Log.d("MedMDeviceManager", "Initialized in StartScanDevice");
        }
        MedMScanner scanner = MedMDeviceKit.getScanner();
        IScannerCallback callback = new HospitalAtHomeScannerCallback();
        scanner.setCallback(callback);
        IErrorCallback errorCallback = new HospitalAtHomeScannerIErrorCallback();
        scanner.setErrorCallback(errorCallback);
        scanner.start();

    }

    @ReactMethod
    public void init(){
        try {
            MedMDeviceKit.init(context.getCurrentActivity().getApplication(),"");
        } catch(Exception e) {
            Log.e("MedMDeviceManager", e.toString());
        }

        if (MedMDeviceKit.isInitialized()) {
            Log.d("MedMDeviceManager", "Initialized in init");
        }
    }


}