# NativeScript Geocoding ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)


[![npm downloads](https://img.shields.io/npm/dm/@nativescript-community/geocoding.svg)](https://www.npmjs.com/package/@nativescript-community/geocoding)
[![npm downloads](https://img.shields.io/npm/dt/@nativescript-community/geocoding.svg)](https://www.npmjs.com/package/@nativescript-community/geocoding)
[![npm](https://img.shields.io/npm/v/@nativescript-community/geocoding.svg)](https://www.npmjs.com/package/@nativescript-community/geocoding)

Description of your plugin.

| <img src="images/demo-ios.png " height="500" /> | <img src="images/demo-android.png" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |

---
## Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API](#api)
4. [Usage](#usage)
9. [Contribute](#contribute)
10. [Demos](#demos)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/geocoding`

## Configuration

Ensure you request geo permissions before using the plugin, using  `@nativescript-community/perms` for instance.

## API

List any API events, properties, and methods for your plugin.
### Events

### Properties

### Methods

```ts
export declare function getLocationFromName(searchString: string): Promise<Location>;
export declare function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Location[]>;
export declare function getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]>;
export declare class Location extends LocationBase {
    android: any; // android.location.Address;
    ios: any; // CLPlacemark;
}
```

## Demos
This repository includes Angular, Vue.js, Svelte, and React demos. In order to run these execute the following in your terminal:

Install Dependencies:
```bash
npm i # or your preferred package manager's install command
```

Run Setup:
```bash
npm run setup
```

Building Plugin:
```bash
npm run build

# or for Angular
npm run build.angular
```

Setup Demos:
```
npm run demo.setup
```

Running Demos:
```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

# Example:
npm run demo.svelte.ios
```

## Contribute
We love PRs! Check out the [contributing guidelines](CONTRIBUTING.md). If you want to contribute, but you are not sure where to start - look for issues labeled help wanted.

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Slack Channel](https://nativescriptcommunity.slack.com/).
