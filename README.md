# RHIT 2023-2024 CSSE Senior Project: Hospital At Home
For any questions, please contact the previous year's development team...

## 💻 Environment Setup
> **important note for development on mac:**  
> please do not clone this git repo to the folder synchronized by icloud, otherwise XCode will not be able to run due to some magical synchronization permission issues.  
> for each time new dependencies are added, please run `pod install` in /ios

<details>
  <summary>ios</summary>

#### install homebrew  
run `/bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh>)"`  
#### install node and watch man
run `brew install node`  
run `brew install watchman`
#### install Xcode in mac App Store
Go Settings >> Locations: make sure that Command Line Tools is the latest version installed  
Go Settings >> Platforms: install ios simulators
#### install CocoaPods
run `sudo gem install cocoapods`  
Reference: https://cocoapods.org/
#### install external dependencies
run `npm install` or `yarn install`  
in /ios run `pod install`
> (Optional) For MacBook with M1, install and enable [Rosetta](https://support.apple.com/en-us/HT211861) in Xcode.
</details>

<details>
  <summary>android</summary>
  
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
</details>

## 🧰 Development Resources
<details>
  <summary>basics</summary>

#### react.js  
- https://react.dev  
#### react native  
- https://reactnative.dev  
#### page navigation
- doc: [react navigation](https://reactnavigation.org)
- page control: [stack navigator](https://reactnavigation.org/docs/stack-navigator)
- menu bar: [tab navigator](https://reactnavigation.org/docs/bottom-tab-navigator)
</details>

<details>
  <summary>vitals</summary>

#### frontend
- vital trend chart: [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- vital data table: [react-native-reanimated-table](https://github.com/dohooo/react-native-reanimated-table)

#### backend
- database: [azure database services](https://azure.microsoft.com/en-us/products/azure-sql/database/)
- function: [azure functions](https://azure.microsoft.com/en-us/products/functions/)
</details>

<details>
  <summary>chat</summary>

#### frontend
- chat conposite: [azure communication ui library](https://azure.github.io/communication-ui-library)

#### backend
- thread control: [acure communication service](https://azure.microsoft.com/en-us/products/communication-services) 
</details>
