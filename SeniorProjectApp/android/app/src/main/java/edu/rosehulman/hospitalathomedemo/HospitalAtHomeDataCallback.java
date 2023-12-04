package edu.rosehulman.hospitalathomedemo;

import android.util.Log;

import com.medm.devicekit.IDataCallback;
import com.medm.devicekit.IDeviceDescription;

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


    public List<String> getData(){
        ArrayList<String> dataTmp = (ArrayList<String>) data.clone();
        data.clear();
        return dataTmp;
    }
}
