package edu.rosehulman.hospitalathomedemo;

import com.medm.devicekit.IDeviceDescription;
import com.medm.devicekit.MeasurementType;

import java.util.ArrayList;
import java.util.List;

public class DeviceMeasurementTypes {
    public static String[] getTypes(IDeviceDescription device) {
        switch (device.getModelName()) {
            case "Omron HN-290T":
                return new String[]{"Weight"};
            case "Omron HEM-9200T/9210T":
                return new String[]{"BloodPressure", "HeartRate"};
            default:
                List<MeasurementType> measurementTypes = device.getMeasurementTypes();
                List<String> strings = new ArrayList<>();
                for (int i = 0; i < measurementTypes.size(); i++) {
                    strings.add(measurementTypes.get(i).toString());
                }
                return (String[]) strings.toArray();
        }

    }
}
