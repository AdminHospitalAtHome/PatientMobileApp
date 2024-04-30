# ios Page
## Podfile Modifications
Flipper is a debugging tool that is being removed from react-native and was causing issues with building in XCode 15.3.
To fix this, we commented out
`:flipper_configuration => flipper_ config,`
which is line 43 of our podfile. If for some reason you need this, uncomment this line.

## Running IOS
To easily run an IOS simulator follow the steps below...
1. Open a terminal at this folder and run `pod install`
2. Open the "HospitalAtHome.xcworkspace" file in Xcode
3. Press the Play button (Start the active scheme) to run and a simulated iPhone will appear
