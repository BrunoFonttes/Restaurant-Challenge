import { CountryCode } from "./country-code";
import { Country } from "./country";
import { StateAbbr } from "./state-code";
import { City } from "./city";
import { ZipCode } from "./zip-code";
import { StreetName } from "./street-name";
import { StreetNumber } from "./street-number";

export interface AddressInputData {
    country: string
    countryCode: string,
    stateAbbr: string,
    city: string,
    zipCode: string,
    streetName: string,
    streetNumber: string
}

export interface AddressOutputData {
    countryCode: CountryCode,
    country: Country,
    stateAbbr: StateAbbr,
    city: City,
    zipCode: ZipCode,
    streetName: StreetName,
    streetNumber: StreetNumber,
}