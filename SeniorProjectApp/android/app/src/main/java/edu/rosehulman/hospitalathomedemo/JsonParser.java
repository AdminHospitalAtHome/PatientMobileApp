package edu.rosehulman.hospitalathomedemo;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.IDeviceStatusCallback;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JsonParser {

    public static String toJson(IDeviceDescription device){
        String res = "{\"address\": \""+ device.getAddress() + "\" , \"id\": \""+device.getSerial() + "\", \"manufacturer\": \""+ device.getManufacturer() + "\" , \"model\": \"" + device.getModel()+  "\" , \"name\": \""+device.getName()
                + "\" , \"modelName\": \"" + device.getModelName()+  "\" }";

        return res;
    }


    public static String toJson(List<IDeviceDescription> devices){
        String res= "[";
        for(int i = 0; i < devices.size(); i++){
            res+=toJson(devices.get(i));
            if(i != devices.size()-1){
                res+=",";
            }

        }

        res+="]";
        return res;
    }

    public static String toJson(IDeviceDescription[] devices) {
        return toJson(Arrays.asList(devices));

    }

    public static String dataToJson(List<String> data){
        String res = "[";
        for (int i = 0; i < data.size(); i++) {
            res+= "\"";
            res+=data.get(i).replaceAll("\"", "\\\""); // Replaces " with \"
            res+= "\"";
            if (i != data.size()-1) {
                res += ",";
            }
        }
        res+="]";
        return res;
    }
}
