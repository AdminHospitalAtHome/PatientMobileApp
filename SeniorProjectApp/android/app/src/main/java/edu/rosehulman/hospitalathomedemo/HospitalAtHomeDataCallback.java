package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDataCallback;
import com.medm.devicekit.IDeviceDescription;
import com.facebook.react.bridge.WritableNativeArray;
import java.util.ArrayList;
import java.util.List;

public class HospitalAtHomeDataCallback implements IDataCallback {
    private ArrayList<String> data = new ArrayList<>();
    @Override
    public void onNewData(IDeviceDescription iDeviceDescription, String s) {
        Log.d("MedMDataCallback", "Addr: " + iDeviceDescription.getAddress() + ", String: " + s);
        data.add(s);
    }

    @Override
    public void onDataCollectionStopped() {
        Log.d("MedMDataCallback", "Collection Stopped");

    }


    public WritableNativeArray getData(){
        WritableNativeArray dataTmp = new WritableNativeArray();
        for(String s : data){
            dataTmp.pushString(s);
        }
        data.clear();
        return dataTmp;
    }
}
