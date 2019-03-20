import { Location as LocationDef } from "./location";
export declare class LocationBase implements LocationDef {
    latitude: number;
    longitude: number;
    name: string;
    isoCountryCode: string;
    country: string;
    postalCode: string;
    administrativeArea: string;
    subAdministrativeArea: string;
    locality: string;
    subLocality: string;
    thoroughfare: string;
    subThoroughfare: string;
}
export declare const LOC_SEARCH_MAX_RESULTS = 10;
