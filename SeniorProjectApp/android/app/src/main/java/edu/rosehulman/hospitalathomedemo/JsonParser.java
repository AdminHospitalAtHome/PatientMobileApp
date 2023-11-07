package edu.rosehulman.hospitalathomedemo;

import com.medm.devicekit.IDeviceDescription;

import java.util.List;

public class JsonParser {

    public static String toJson(IDeviceDescription device){
        String res = "{\"address\": \""+ device.getAddress() + "\" , \"id\": \""+device.getSerial() + "\", \"manufacturer\": \""+ device.getManufacturer() + "\" , \"modelName\": \"" + device.getModel()+  "\" , \"name\": \""+device.getName()
                + "\" }";

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
}
