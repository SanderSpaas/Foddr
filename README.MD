# Foddr

Foddr is a mobile application that I developed for Mobile Application Development in my thirth year.

## Installation
Firstly, make sure that you have setup the correct development environment. The steps to do this can be found [here](https://reactnative.dev/docs/environment-setup).

### Windows (developing for android)
Pull the project into a folder of your liking.

```bash
yarn install
npx react-native run-android
```
### IOS (developing for IOS)
Pull the project into a folder of your liking.
```bash
yarn install
cd ios
bundle install
bundle exec pod install
cd ..
npx react-native run-ios
```
# Troubleshooting
Did you really follow all the steps to [setup](https://reactnative.dev/docs/environment-setup) your development enviroment?
On mac it can sometimes help to completely remove your pods, podfile.lock, the build and the workspace. This can be done wit this command: 
```bash
cd ios
rm -rf Pods Podfile.lock <your_app_name>.xcworkspace build
```
Afterwards you will have to intall your pods again with: 
```bash
cd ios
bundle install
bundle exec pod install
```

Because I know you won't read the guide I linked, please make sure that you have the right ruby version installed -> ruby '2.7.5'. But please read the [guide](https://reactnative.dev/docs/environment-setup).
