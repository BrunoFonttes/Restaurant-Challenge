import { Hours } from "../../../shared/hours"

export class InvalidOneDayBusinessHoursError extends Error implements DomainError {
    constructor(openingTime: string, closingTime: string) {
        super(`The business hours "${openingTime} - ${closingTime} " is invalid.`)
        this.name = 'InvalidOneDayBusinessHoursError'
    }
}
