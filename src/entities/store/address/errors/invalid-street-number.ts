export class InvalidStreetNumberError extends Error implements DomainError {
    constructor(streetNumber: string) {
        super(`The streetNumber "${streetNumber}" is invalid.`)
        this.name = 'InvalidStreetNumberError'
    }
}
