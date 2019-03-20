import { Location as LocationDef } from "./location";

export class LocationBase implements LocationDef {
  public latitude: number;
  public longitude: number;
  public name: string;
  public isoCountryCode: string;
  public country: string;
  public postalCode: string;
  public administrativeArea: string;
  public subAdministrativeArea: string;
  public locality: string;
  public subLocality: string;
  public thoroughfare: string;
  public subThoroughfare: string;
}

export const LOC_SEARCH_MAX_RESULTS = 10;