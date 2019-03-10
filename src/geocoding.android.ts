import * as application from 'tns-core-modules/application';
import { LocationBase } from "./geocoding.common";

export function getLocationFromName(searchString: string): Promise<Location> {
    return new Promise(function(resolve, reject) {
        var geocoder = getAndroidGeocoder();
        var locations = geocoder.getFromLocationName(searchString, 1);
        if (locations != null && locations.size() > 0) {
            var loc = locations.get(0);
            return resolve(new Location(loc));
        }
    });
}

let androidGeocoder: any;

function getAndroidGeocoder(): android.location.Geocoder {
    if (!androidGeocoder) {
        var locale = java.util.Locale.getDefault();
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

            // this.name = androidLocation.getAddressLine
        }
    }
}