import { Device } from '@nativescript/core';
import { LOC_SEARCH_MAX_RESULTS, LocationBase } from './geocoding-common';

export function getLocationFromName(searchString: string): Promise<Location> {
    return new Promise(function (resolve, reject) {
        getIosGeocoder().geocodeAddressStringCompletionHandler(searchString, (placemarks, error) => {
            if (error) {
                const clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                return reject(clError);
            } else if (placemarks && placemarks.count > 0) {
                console.dir(placemarks[0]);
                const pm = placemarks[0];
                resolve(locationFromCLPlacemark(pm));
            }
        });
    });
}

export function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Location[]> {
    return new Promise(function (resolve, reject) {
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        getIosGeocoder().geocodeAddressStringCompletionHandler(searchString, (placemarks, error) => {
            if (error) {
                const clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                return reject(clError);
            } else if (placemarks && placemarks.count > 0) {
                const maxRes = Math.min(placemarks.count, maxResCount);
                const res = new Array<Location>();
                for (let i = 0; i < maxRes; i++) {
                    console.dir(placemarks[i]);
                    res.push(locationFromCLPlacemark(placemarks[i]));
                }
                resolve(res);
            }
        });
    });
}

export function getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]> {
    return new Promise(function (resolve, reject) {
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        const cllocation = CLLocation.alloc().initWithLatitudeLongitude(latitude, longitude);
        getIosGeocoder().reverseGeocodeLocationCompletionHandler(cllocation, (placemarks, error) => {
            if (error) {
                const clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                return reject(clError);
            } else if (placemarks && placemarks.count > 0) {
                const maxRes = Math.min(placemarks.count, maxResCount);
                const res = new Array<Location>();
                for (let i = 0; i < maxRes; i++) {
                    console.dir(placemarks[i]);
                    res.push(locationFromCLPlacemark(placemarks[i]));
                }
                resolve(res);
            }
        });
    });
}

function getVersionMaj() {
    return parseInt(Device.osVersion.split('.')[0], 10);
}

function locationFromCLPlacemark(pm: CLPlacemark): Location {
    const mVer = getVersionMaj();
    const location = new Location();
    location.latitude = pm.location?.coordinate?.latitude;
    location.longitude = pm.location?.coordinate?.longitude;
    if (mVer < 11) {
        const addressDictionary = pm.addressDictionary;
        location.subThoroughfare = addressDictionary.objectForKey('SubThoroughfare');
        location.thoroughfare = addressDictionary.objectForKey('Thoroughfare');
        location.locality = addressDictionary.objectForKey('City');
        location.subLocality = addressDictionary.objectForKey('SubLocality');
        location.administrativeArea = addressDictionary.objectForKey('State');
        location.subAdministrativeArea = addressDictionary.objectForKey('SubAdministrativeArea');
        location.postalCode = addressDictionary.objectForKey('ZIP');
        location.country = addressDictionary.objectForKey('Country');
        location.isoCountryCode = addressDictionary.objectForKey('CountryCode');
    } else {
        location.name = pm.name;
        location.isoCountryCode = pm.ISOcountryCode;
        location.country = pm.country;
        location.postalCode = pm.postalCode;
        location.administrativeArea = pm.administrativeArea;
        location.subAdministrativeArea = pm.subAdministrativeArea;
        location.locality = pm.locality;
        location.subLocality = pm.subLocality;
        location.thoroughfare = pm.thoroughfare;
        location.subThoroughfare = pm.subThoroughfare;
    }

    location.ios = pm;
    return location;
}
let iosGeocoder: any;

function getIosGeocoder(): CLGeocoder {
    if (!iosGeocoder) {
        iosGeocoder = new CLGeocoder();
    }
    return iosGeocoder;
}

export class Location extends LocationBase {
    public ios: CLPlacemark; // iOS native location
}
