import { Either, left, right } from "../../../shared/either"
import { InvalidCountryError } from "./errors/invalid-country"

export class Country {
    static allowedCountry: Array<string> = ['Brasil']
    private constructor( private readonly country: string) {
    }

    get value(): string {
        return this.country
    }

    static create(country: string): Either<InvalidCountryError, Country> {
        if (Country.validate(country)) {
            return right(new Country(country))
        }
        return left(new InvalidCountryError(country))
    }

    static validate(country: string): boolean {
        if (!country || country.trim().length < 2 || country.trim().length > 255|| Country.allowedCountry.findIndex(element => element === country) === -1) {
            return false
        }
        return true
    }
}