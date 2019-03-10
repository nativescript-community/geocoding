# NativeScript Geocoding ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png) 

[![npm](https://img.shields.io/npm/v/nativescript-geocoding.svg)](https://www.npmjs.com/package/nativescript-geocoding)
[![npm](https://img.shields.io/npm/dm/nativescript-geocoding.svg)](https://www.npmjs.com/package/nativescript-geocoding)

Forward-geocoding requests take a user-readable address and find the corresponding latitude and longitude value and may also return additional information about the specified location, such as a point of interest or building at that location.

## Installation

In Command prompt / Terminal navigate to your application root folder and run:

```
tns plugin add nativescript-geocoding
```

## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin's root folder. 
In `demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `demo/app/main-page.ts`.

In short here are the steps:

### Import the plugin

*TypeScript*
``` 
import * as geocoding from "nativescript-geocoding";
```

*Javascript*
``` 
var geocoding = require("nativescript-geocoding");
```

### Call plugin methods

````
  geocoding.getLocationFromName('Copenhagen Denmark').then(function (loc) {
      console.log('Found ', loc);
  }, function (e) {
      console.log("Error: " + (e.message || e));
  });
````

### Demo

To run the Angular demo:
```bash
$ cd nativescript-geocoding/src
$ npm run demo.ios
$ npm run demo.android
```