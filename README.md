# RHIT 2023-2024 CSSE Senior Project: Hospital At Home
For any questions, please contact:

Yuxuan Jiang: jiangy10@rose-hulman.edu

Jake Wallis: wallisjm@rose-hulman.edu

Ken Zheng: zhengy9@rose-hulman.edu

Yunzhe Wei: weiy5@rose-hulman.edu

## Environment Setup
> **important note for development on mac:**  
> please do not clone this git repo to the folder synchronized by icloud, otherwise XCode will not be able to run due to some magical synchronization permission issues.  
> for each time new dependencies are added, please run `pod install` in /ios
### ios
#### install homebrew
run `/bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh>)"`  
Reference: https://brew.sh/
#### install node and watch man
run `brew install node`  
run `brew install watchman`
#### install Xcode in mac App Store
Go Settings >> Locations: make sure that Command Line Tools is the latest version installed  
Go Settings >> Platforms: install ios simulators
### install CocoaPods
run `sudo gem install cocoapods`  
Reference: https://cocoapods.org/
### install external dependencies
run `npm install` or `yarn install`  
in /ios run `pod install`

### android
#### install homebrew
run `/bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh>)"`  
Reference: https://brew.sh/
#### install node and watch man
run `brew install node`  
run `brew install watchman
#### install Java Development Kit
run `brew install --cask zulu11`
#### install Android Studio
download android studio at https://developer.android.com/studio




