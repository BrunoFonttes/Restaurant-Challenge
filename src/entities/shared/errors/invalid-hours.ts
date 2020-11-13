export class InvalidHoursError extends Error implements DomainError {
    constructor(hours: string) {
        super(`The hours "${hours}" is invalid.`)
        this.name = 'InvalidHoursError'
    }
}
