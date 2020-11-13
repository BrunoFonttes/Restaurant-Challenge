export class InvalidStateAbbrError extends Error implements DomainError {
    constructor(stateAbbr: string) {
        super(`The stateAbbr "${stateAbbr}" is invalid.`)
        this.name = 'InvalidStateAbbrError'
    }
}
