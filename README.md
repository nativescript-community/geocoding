# NativeScript Geocoding ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png) 

[![npm](https://img.shields.io/npm/v/nativescript-geocoding.svg)](https://www.npmjs.com/package/nativescript-geocoding)
[![npm](https://img.shields.io/npm/dm/nativescript-geocoding.svg)](https://www.npmjs.com/package/nativescript-geocoding)

Forward-geocoding requests take a user-readable address and find the corresponding latitude and longitude value and may also return additional information about the specified location, such as a point of interest or building at that location.

![](screenshots/nativescript-geocoding.gif?raw=true)

## Installation

In a command prompt / terminal navigate to your application root folder and run:

```
tns plugin add nativescript-geocoding
```

## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin's root folder. 
In the `demo-angular` folder you can find the usage of the plugin for an Angular application (`demo-angular/src/app/home/home.component.ts`.

Steps:

### Import the plugin

*TypeScript*
``` 
import * as geocoding from "nativescript-geocoding";
```

*Javascript*
``` 
var geocoding = require("nativescript-geocoding");
```

### Call the plugin

````
  geocoding.getLocationFromName('Copenhagen').then(loc => {
      console.log('Found ', loc);
  }, function (e) {
      console.log("Error: " + (e.message || e));
  });
````

### Demo

To run the Angular demo:
```
$ cd nativescript-geocoding/src
$ npm run demo.ios
$ npm run demo.android
```

### Notes

- For Android, the minimum API level is 21 in order to get detailed location info.

- On iOS you may receive this message
```
 Error: iOS CLGeocoder error : The operation couldn’t be completed. (kCLErrorDomain error 8.)
```
if the CLGeocoder was not able to find anything for the search string.
