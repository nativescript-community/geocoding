import { LocationBase } from './geocoding-common';
export * from './geocoding-common';
export * from './location';

export declare function getLocationFromName(searchString: string): Promise<Location>;
export declare function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Location[]>;
export declare function getFromLocation(latitude: number, longitude: number, maxResCount?: number): Promise<Location[]>;
export declare class Location extends LocationBase {
    android: any; // android.location.Address;
    ios: any; // CLPlacemark;
}
