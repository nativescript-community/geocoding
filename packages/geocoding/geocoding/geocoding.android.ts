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
        
    const geocoder = getAndroidGeocoder();
    const locations = geocoder.getFromLocationName(searchString, 1);
    if (locations != null && locations.size() > 0) {
        const loc = locations.get(0);
        return new Location(loc);
    } else {
        throw new Error('Android Geocoder error : No locations found');
    }
    } catch (error) {
        throw wrapJavaException(error);
        
    }
}

export async function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Location[]> {
    try {
        
    const geocoder = getAndroidGeocoder();
    if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
        maxResCount = LOC_SEARCH_MAX_RESULTS;
    }
    const locations = geocoder.getFromLocationName(searchString, maxResCount);
    if (locations != null && locations.size() > 0) {
        const maxRes = Math.min(locations.size(), maxResCount);
        const res = new Array<Location>();
        for (let i = 0; i < maxRes; i++) {
            res.push(new Location(locations.get(i)));
        }
        return res;
    } else {
        throw new Error('Android Geocoder error : No locations found');
    }
    } catch (error) {
        throw wrapJavaException(error);
        
    }
}

export async function getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]> {
    try {
        
        const geocoder = getAndroidGeocoder();
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        const locations = geocoder.getFromLocation(latitude, longitude, maxResCount);
        if (locations != null && locations.size() > 0) {
            const maxRes = Math.min(locations.size(), maxResCount);
            const res = new Array<Location>();
            for (let i = 0; i < maxRes; i++) {
                res.push(new Location(locations.get(i)));
            }
            return res;
        } else {
            return [];
        }
    } catch (error) {
        throw wrapJavaException(error);
    }
}
