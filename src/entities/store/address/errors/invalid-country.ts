export class InvalidCountryError extends Error implements DomainError {
    constructor(country: string) {
        super(`The country "${country}" is invalid.`)
        this.name = 'InvalidCountryError'
    }
}
