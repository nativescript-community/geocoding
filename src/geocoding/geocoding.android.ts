import { Application } from '@nativescript/core';
import { LOC_SEARCH_MAX_RESULTS, LocationBase } from './geocoding-common';

let androidGeocoder: any;

function wrapJavaException(ex) {
    if (ex instanceof java.lang.Exception) {
        const err = new Error(ex.toString());
        err['nativeException'] = ex;
        //@ts-ignore
        err['stackTrace'] = com.tns.NativeScriptException.getStackTraceAsString(ex);
        return err;
    }
    return ex;
}

function getAndroidGeocoder(): android.location.Geocoder {
    if (!androidGeocoder) {
        const locale = java.util.Locale.getDefault();
        androidGeocoder = new android.location.Geocoder(Application.android.context, locale);
    }
    return androidGeocoder;
}

/**
 * `Geocoder.getFromLocation*` are blocking network calls: on API 33+ use the listener
 * flavour so the UI thread is never held, older versions can only block.
 */
function geocodeAsync(
    asyncCall: (geocoder: android.location.Geocoder, listener: android.location.Geocoder.GeocodeListener) => void,
    syncCall: (geocoder: android.location.Geocoder) => java.util.List<android.location.Address>
): Promise<android.location.Address[]> {
    const geocoder = getAndroidGeocoder();
    return new Promise((resolve, reject) => {
        const toArray = (addresses: java.util.List<android.location.Address>) => {
            const result: android.location.Address[] = [];
            for (let index = 0; addresses && index < addresses.size(); index++) {
                result.push(addresses.get(index));
            }
            return result;
        };
        try {
            if (android.os.Build.VERSION.SDK_INT >= 33) {
                asyncCall(
                    geocoder,
                    new android.location.Geocoder.GeocodeListener({
                        onGeocode: (addresses) => resolve(toArray(addresses)),
                        onError: (errorMessage) => reject(new Error(errorMessage ?? 'java.io.IOException: UNAVAILABLE'))
                    })
                );
            } else {
                resolve(toArray(syncCall(geocoder)));
            }
        } catch (error) {
            reject(wrapJavaException(error));
        }
    });
}

export class Location extends LocationBase {
    public android: android.location.Address;

    constructor(androidLocation: android.location.Address) {
        super();
        if (androidLocation) {
            this.android = androidLocation;
            this.name = androidLocation.getFeatureName();
            this.latitude = androidLocation.getLatitude();
            this.longitude = androidLocation.getLongitude();
            this.country = androidLocation.getCountryName();
            this.isoCountryCode = androidLocation.getCountryCode();
            this.locality = androidLocation.getLocality();
            this.postalCode = androidLocation.getPostalCode();
            this.administrativeArea = androidLocation.getAdminArea();
            this.subAdministrativeArea = androidLocation.getSubAdminArea();
            this.subLocality = androidLocation.getSubLocality();
            this.subThoroughfare = androidLocation.getSubThoroughfare();
            this.thoroughfare = androidLocation.getThoroughfare();
        }
    }
}
export async function getLocationFromName(searchString: string): Promise<Location> {
    try {
        const locations = await geocodeAsync(
            (geocoder, listener) => geocoder.getFromLocationName(searchString, 1, listener),
            (geocoder) => geocoder.getFromLocationName(searchString, 1)
        );
        if (locations.length > 0) {
            return new Location(locations[0]);
        }
        throw new Error('Android Geocoder error : No locations found');
    } catch (error) {
        throw wrapJavaException(error);
    }
}

export async function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Location[]> {
    try {
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        const locations = await geocodeAsync(
            (geocoder, listener) => geocoder.getFromLocationName(searchString, maxResCount, listener),
            (geocoder) => geocoder.getFromLocationName(searchString, maxResCount)
        );
        if (locations.length > 0) {
            return locations.slice(0, maxResCount).map((location) => new Location(location));
        }
        throw new Error('Android Geocoder error : No locations found');
    } catch (error) {
        throw wrapJavaException(error);
    }
}

export async function getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]> {
    try {
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        const locations = await geocodeAsync(
            (geocoder, listener) => geocoder.getFromLocation(latitude, longitude, maxResCount, listener),
            (geocoder) => geocoder.getFromLocation(latitude, longitude, maxResCount)
        );
        return locations.slice(0, maxResCount).map((location) => new Location(location));
    } catch (error) {
        throw wrapJavaException(error);
    }
}
