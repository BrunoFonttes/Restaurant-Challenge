import { Either, left, right } from "../../../shared/either"
import { CountryCode } from "./country-code"
import { Country } from "./country"
import { StateAbbr } from "./state-code"
import { City } from "./city"
import { ZipCode } from "./zip-code"
import { StreetName } from "./street-name"
import { StreetNumber } from "./street-number"
import { AddressOutputData, AddressInputData } from "./address-data"
import { InvalidCountryCodeError } from "./errors/invalid-country-code"
import { InvalidCountryError } from "./errors/invalid-country"
import { InvalidStateAbbrError } from "./errors/invalid-state-abbr"
import { InvalidCityError } from "./errors/invalid-city"
import { InvalidZipCodeError } from "./errors/invalid-zip-code"
import { InvalidStreetNameError } from "./errors/invalid-street-name"
import { InvalidStreetNumberError } from "./errors/invalid-street-number"


export class Address {
    private constructor(
        private readonly countryCode: CountryCode,
        private readonly country: Country,
        private readonly stateAbbr: StateAbbr,
        private readonly city: City,
        private readonly zipCode: ZipCode,
        private readonly streetName: StreetName,
        private readonly streetNumber: StreetNumber,
    ) {
        Object.freeze(this)
    }

    get value(): AddressOutputData {
        return {
            countryCode: this.countryCode,
            country: this.country,
            stateAbbr: this.stateAbbr,
            city: this.city,
            zipCode: this.zipCode,
            streetName: this.streetName,
            streetNumber: this.streetNumber
        }
    }

    static create(addressData: AddressInputData):
        Either<InvalidCountryCodeError |
            InvalidCountryError |
            InvalidStateAbbrError |
            InvalidCityError |
            InvalidZipCodeError |
            InvalidStreetNameError |
            InvalidStreetNumberError, Address> {
        const countryCodeOrError: Either<InvalidCountryCodeError, CountryCode> = CountryCode.create(addressData.countryCode)
        const countryOrError: Either<InvalidCountryError, Country> = Country.create(addressData.country)
        const stateAbbrOrError: Either<InvalidStateAbbrError, StateAbbr> = StateAbbr.create(addressData.stateAbbr)
        const cityOrError: Either<InvalidCityError, City> = City.create(addressData.city)
        const zipCodeOrError: Either<InvalidZipCodeError, ZipCode> = ZipCode.create(addressData.zipCode)
        const streetNameOrError: Either<InvalidStreetNameError, StreetName> = StreetName.create(addressData.streetName)
        const streetNumberOrError: Either<InvalidStreetNumberError, StreetNumber> = StreetNumber.create(addressData.streetNumber)

        if (countryCodeOrError.isLeft()) {
            return left(countryCodeOrError.value)
        }
        if (countryOrError.isLeft()) {
            return left(countryOrError.value)
        }
        if (stateAbbrOrError.isLeft()) {
            return left(stateAbbrOrError.value)
        }
        if (cityOrError.isLeft()) {
            return left(cityOrError.value)
        }
        if (zipCodeOrError.isLeft()) {
            return left(zipCodeOrError.value)
        }
        if (streetNameOrError.isLeft()) {
            return left(streetNameOrError.value)
        }
        if (streetNumberOrError.isLeft()) {
            return left(streetNumberOrError.value)
        }

        const countryCode: CountryCode = countryCodeOrError.value
        const country: Country = countryOrError.value
        const stateAbbr: StateAbbr = stateAbbrOrError.value
        const city: City = cityOrError.value
        const zipCode: ZipCode = zipCodeOrError.value
        const streetName: StreetName = streetNameOrError.value
        const streetNumber: StreetNumber = streetNumberOrError.value

        return right(new Address(countryCode, country, stateAbbr, city, zipCode, streetName, streetNumber))
    }
}