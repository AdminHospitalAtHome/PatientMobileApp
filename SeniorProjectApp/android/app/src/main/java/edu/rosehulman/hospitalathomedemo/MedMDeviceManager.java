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
import android.util.Log;

public class MedMDeviceManager extends ReactContextBaseJavaModule {
    MedMDeviceManager(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "MedMDeviceManager";
    }

    @ReactMethod
    public void testMethod(String name, Callback callback) {
        Log.d("MedMDeviceManager","Hello " + name);
        callback.invoke("Hello " + name);
    }

    @ReactMethod
    public void testPromiseMethod(String name, Promise promise) {
        Log.d("MedMDeviceManager","Hello " + name);
        promise.resolve("Hello " + name);
    }
}
