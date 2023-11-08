package edu.rosehulman.hospitalathomedemo;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.medm.devicekit.*;

import javax.annotation.Nullable;

public class MedMDeviceManager extends ReactContextBaseJavaModule {
    private ReactApplicationContext context;
    private ArrayList<IDeviceDescription> pairableDevices = new ArrayList<>();

    private Callback newDeviceCallBack = null;
    private ScannerStopToken stopToken = null;

    private int newDeviceDetectedListeners = 0;

    MedMDeviceManager(ReactApplicationContext context) {
        super(context);
        this.context = context;

    }

    @Override
    public String getName() {
        return "MedMDeviceManager";
    }

    @ReactMethod
    public void startDeviceScan() {
        Log.d("MedMDeviceManager", "Start Scan");

        if (MedMDeviceKit.isInitialized()) {
            Log.d("MedMDeviceManager", "Initialized in StartScanDevice");
        }
        MedMScanner scanner = MedMDeviceKit.getScanner();
        IScannerCallback callback = new HospitalAtHomeScannerCallback(this);
        scanner.setCallback(callback);
        IErrorCallback errorCallback = new HospitalAtHomeScannerIErrorCallback();
        scanner.setErrorCallback(errorCallback);



        stopToken = scanner.start();
    }
    public void addPairableDevice(IDeviceDescription iDeviceDescription) {
        boolean isIn = false;

        for (IDeviceDescription i: pairableDevices) {
            if (i.getAddress().equals(iDeviceDescription.getAddress())) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            pairableDevices.add(iDeviceDescription);
            Log.d("MedMDeviceManagaer", iDeviceDescription.getAddress());
            Log.d("MedMDeviceManager", "New ADDED");
            Log.d("MedMDeviceManager", ""+pairableDevices.size());
            WritableMap params= Arguments.createMap();
            params.putString("pairableDevices", JsonParser.toJson(pairableDevices));
            sendNewDeviceDetectedEvent(context, "New_Device", params);
        }

    }

    private void sendNewDeviceDetectedEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void addNewDeviceDetectedListener(String eventName) {
        newDeviceDetectedListeners += 1;
    }



    @ReactMethod
    public void deviceScanSetNewCallback(Callback newDeviceCallBack) {
        Log.d("MedMDeviceManager", "New Callback");
        this.newDeviceCallBack = newDeviceCallBack;
    }

    @ReactMethod
    public void pairableDeviceList(Promise promise){
        Log.d("MedMDeviceManager", JsonParser.toJson(pairableDevices));
        promise.resolve(JsonParser.toJson(pairableDevices));

    }

    // Returns Promise<Boolean> with True if it is stopped and False if it didnt stop
    @ReactMethod
    public void stopDeviceScan(Promise promise){
        pairableDevices.clear();
        if(stopToken != null && !stopToken.isStopped() && !stopToken.isScanFinished()){
            stopToken.stopScan();
            Log.d("MedMDeviceManager", "Scanning Stopped");
            promise.resolve(true);
        }
        promise.resolve(false);

    }

    @ReactMethod
    public void init(){
        try {
            MedMDeviceKit.init(context.getCurrentActivity().getApplication(),BuildConfig.SECRET);
        } catch(Exception e) {
            Log.e("MedMDeviceManager", e.toString());
        }

        if (MedMDeviceKit.isInitialized()) {
            Log.d("MedMDeviceManager", "Initialized in init");
        }
    }


}