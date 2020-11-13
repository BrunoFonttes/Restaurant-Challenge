import { Either, left, right } from "../../../shared/either"
import { InvalidCountryCodeError } from "./errors/invalid-country-code"


export class CountryCode {
    static allowedCountryCodes: Array<string> = ['BR']
    private constructor(private readonly countryCode: string) {
    }

    get value(): string {
        return this.countryCode
    }

    static create(countryCode: string): Either<InvalidCountryCodeError, CountryCode> {
        if (CountryCode.validate(countryCode)) {
            return right(new CountryCode(countryCode))
        }
        return left(new InvalidCountryCodeError(countryCode))
    }


    static validate(countryCode: string): boolean {
        if (!countryCode || countryCode.trim().length !== 2 || CountryCode.allowedCountryCodes.findIndex(element => element === countryCode) === -1) {
            return false
        }
        return true
    }
}