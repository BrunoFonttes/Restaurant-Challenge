export class InvalidZipCodeError extends Error implements DomainError {
    constructor(zipcode: string) {
        super(`The zipcode "${zipcode}" is invalid.`)
        this.name = 'InvalidZipCodeError'
    }
}
