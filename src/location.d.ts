/**
 * A data class that encapsulates common properties for a geolocation.
 */
export class Location {
    /**
     * The latitude of the geolocation, in degrees.
     */
    latitude: number;

    /**
     * The longitude of the geolocation, in degrees.
     */
    longitude: number;

    /**
     * The name of the placemark.
     *
     */
    name: string;

    /**
     * The abbreviated country name.
     */
    isoCountryCode: string;

    /**
     * The name of the country associated with the placemark.
     */
    country: string;

    /**
     * The postal code associated with the placemark.
     */
    postalCode: string;

    /**
     * The state or province associated with the placemark.
     */
    administrativeArea: string;

    /**
     * Additional administrative area information for the placemark.
     */
    subAdministrativeArea: string;

    /**
     * The city associated with the placemark.
     */
    locality: string;

    /**
     * Additional city-level information for the placemark.
     */
    subLocality: string;

    /**
     * The street address associated with the placemark.
     */
    thoroughfare: string;

    /**
     * Additional street-level information for the placemark.
     */
    subThoroughfare: string;
}
