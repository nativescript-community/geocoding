import * as application from 'tns-core-modules/application';
import { LocationBase, LOC_SEARCH_MAX_RESULTS } from "./geocoding.common";

export function getLocationFromName(searchString: string): Promise<Location> {
    return new Promise(function(resolve, reject) {
        let geocoder = getAndroidGeocoder();
        let locations = geocoder.getFromLocationName(searchString, 1);
        if (locations != null && locations.size() > 0) {
            let loc = locations.get(0);
            return resolve(new Location(loc));
        }
    });
}

export function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Array<Location>> {
    return new Promise(function(resolve, reject) {
        let geocoder = getAndroidGeocoder();
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        let locations = geocoder.getFromLocationName(searchString, maxResCount);
        if (locations != null && locations.size() > 0) {
            let maxRes = Math.min(locations.size(), maxResCount);
            let res = new Array<Location>();
            for (let i = 0; i < locations.size(); i++) {
                res.push(new Location(locations.get(i)));
            }
            return resolve(res);
        }
    });
}

let androidGeocoder: any;

function getAndroidGeocoder(): android.location.Geocoder {
    if (!androidGeocoder) {
        let locale = java.util.Locale.getDefault();
        androidGeocoder = new android.location.Geocoder(application.android.currentContext, locale);
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
            this.subAdministrativeArea = androidLocation.getSubAdminArea();
            this.subLocality = androidLocation.getSubLocality();
            this.subThoroughfare = androidLocation.getSubThoroughfare();
            this.thoroughfare = androidLocation.getThoroughfare();
        }
    }
}