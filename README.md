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

_TypeScript_

```
import * as geocoding from "nativescript-geocoding";
```

_Javascript_

```
var geocoding = require("nativescript-geocoding");
```

### Call the plugin

```
  geocoding.getLocationFromName('Copenhagen').then(loc => {
      console.log('Found ', loc);
  }, function (e) {
      console.log("Error: " + (e.message || e));
  });
```
or in case you may want to treat possible, multiple hits

```
geocoding.getLocationListFromName(searchBar.text, 5).then(locations => {
            console.log('Found ', locations.length);
            if (locations.length > 0) {
                this.location = locations[0];
            }
        }, function (e) {
            console.log('Error: ' + (e.message || e));
        });
```


### Demo

To run the Angular demo:

```
$ cd nativescript-geocoding/src
$ npm run demo.ios
$ npm run demo.android
```

## Native APIs

### Android implementation

- Details: https://developer.android.com/reference/android/location/Geocoder

Returns an array of Addresses that are known to describe the named location, which may be a place name
such as "Dalvik, Iceland", an address such as "1600 Amphitheatre Parkway, Mountain View, CA",
an airport code such as "SFO", etc.. The returned addresses will be localized for the locale provided
to this class's constructor.

The query will block and returned values will be obtained by means of a network lookup. The
results are a best guess and are not guaranteed to be meaningful or correct. It may be useful to
call this method from a thread separate from your primary UI thread.

Parameters
locationName String: a user-supplied description of a location
maxResults int: max number of results to return. Smaller numbers (1 to 5) are recommended

### iOS implementation

- Details: https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names

Depending on the precision of the user-provided information, you may receive one result or multiple results.
For example, passing a string of "100 Main St., USA" may return many results unless you also specify a search
region or additional details. To help you decide which result is correct, the geocoder actually returns
CLPlacemark objects, which contain both the coordinate and the original information that you provided.


## Notes

-   For Android, the minimum API level is 21 in order to get detailed location info.

-   On iOS you may receive this message

```
 Error: iOS CLGeocoder error : The operation couldn’t be completed. (kCLErrorDomain error 8.)
```

if the CLGeocoder was not able to find anything for the search string.
