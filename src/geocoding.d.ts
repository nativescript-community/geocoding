import { Location } from './location';

/**
 * Get a single location by search string.
 *
 * @param searchString Adress or location name to search for
 */
export function getLocationFromName(searchString: string): Promise<Location>;

/**
 * Get a list of locations for the given search string. Usually both iOs and Android only return
 * a single location based on the best match.
 *
 * Android implementation (https://developer.android.com/reference/android/location/Geocoder):
 * Returns an array of Addresses that are known to describe the named location, which may be a place name
 * such as "Dalvik, Iceland", an address such as "1600 Amphitheatre Parkway, Mountain View, CA",
 * an airport code such as "SFO", etc.. The returned addresses will be localized for the locale provided
 * to this class's constructor.
 *
 * The query will block and returned values will be obtained by means of a network lookup. The
 * results are a best guess and are not guaranteed to be meaningful or correct. It may be useful to
 * call this method from a thread separate from your primary UI thread.
 *
 * Parameters
 * locationName	String: a user-supplied description of a location
 * maxResults	int: max number of results to return. Smaller numbers (1 to 5) are recommended
 *
 *
 * iOS implementation
 * (https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names):
 * Depending on the precision of the user-provided information, you may receive one result or multiple results.
 * For example, passing a string of "100 Main St., USA" may return many results unless you also specify a search
 * region or additional details. To help you decide which result is correct, the geocoder actually returns
 * CLPlacemark objects, which contain both the coordinate and the original information that you provided.
 *
 * @param searchString Adress or location name to search for
 * @param maxResCount Max result count (capped at 10 - smaller numbers (1 to 5) are recommended)
 */
export function getLocationListFromName(
    searchString: string,
    maxResCount?: number
): Promise<Array<Location>>;
