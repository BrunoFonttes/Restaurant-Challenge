import { Either, left, right } from "../../../shared/either"
import { InvalidStreetNameError } from "./errors/invalid-street-name"

export class StreetName {
    private constructor(private readonly streetName: string) {
    }

    get value(): string {
        return this.streetName
    }

    static create(streetName: string): Either<InvalidStreetNameError, StreetName> {
        if (StreetName.validate(streetName)) {
            return right(new StreetName(streetName))
        }
        return left(new InvalidStreetNameError(streetName))
    }

    static validate(streetName: string): boolean {
        if (!streetName || streetName.trim().length < 2 || streetName.trim().length > 255) {
            return false
        }
        return true
    }
}