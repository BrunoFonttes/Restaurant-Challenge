export class InvalidStreetNameError extends Error implements DomainError {
    constructor(streetName: string) {
        super(`The streetName "${streetName}" is invalid.`)
        this.name = 'InvalidStreetNameError'
    }
}
