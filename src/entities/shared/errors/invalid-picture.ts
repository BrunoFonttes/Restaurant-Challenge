export class InvalidPictureError extends Error implements DomainError {
    constructor() {
        super(`The picture is invalid.`)
        this.name = 'InvalidPictureError'
    }
}
