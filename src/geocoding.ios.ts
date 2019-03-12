
import { device } from  'tns-core-modules/platform';
import { LocationBase } from './geocoding.common';

export function getLocationFromName(searchString: string): Promise<Location> {
    return new Promise(function(resolve, reject) {
        getIosGeocoder().geocodeAddressStringCompletionHandler(searchString,
            (placemarks, error) => {
                if (error) {
                    let clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                    return reject(clError);
                } else if (placemarks && placemarks.count > 0) {
                    let pm = placemarks[0];
                    resolve(locationFromCLPlacemark(pm));
            }
        });
    });
}

function getVersionMaj () {
    return parseInt(device.osVersion.split(".")[0]);
}


function locationFromCLPlacemark(pm: CLPlacemark): Location {
    let mVer = getVersionMaj();
    let location = new Location();
    location.latitude = pm.location.coordinate.latitude;
    location.longitude = pm.location.coordinate.longitude;
    if (mVer < 11) {
        let addressDictionary = pm.addressDictionary;
        location.subThoroughfare = addressDictionary.objectForKey('SubThoroughfare');
        location.thoroughfare = addressDictionary.objectForKey('Thoroughfare');
        location.locality = addressDictionary.objectForKey('City');
        location.subLocality = addressDictionary.objectForKey('SubLocality');
        location.administrativeArea = addressDictionary.objectForKey('State');
        location.subAdministrativeArea = addressDictionary.objectForKey('SubAdministrativeArea');
        location.postalCode = addressDictionary.objectForKey('ZIP');
        location.country = addressDictionary.objectForKey('Country');
        location.isoCountryCode = addressDictionary.objectForKey('CountryCode');
    }
    else {
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