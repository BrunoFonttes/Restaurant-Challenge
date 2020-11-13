export class InvalidCountryCodeError extends Error implements DomainError {
    constructor(countryCode: string) {
        super(`The countryCode "${countryCode}" is invalid.`)
        this.name = 'InvalidCountryCodeError'
    }
}
