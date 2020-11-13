
import { Either, left, right } from "../../../shared/either"
import { InvalidStreetNumberError } from "./errors/invalid-street-number"

export class StreetNumber {
    private constructor(private readonly streetNumber: string) {
    }

    get value(): string {
        return this.streetNumber
    }

    static create(streetNumber: string): Either<InvalidStreetNumberError, StreetNumber> {
        if (StreetNumber.validate(streetNumber)) {
            return right(new StreetNumber(streetNumber))
        }
        return left(new InvalidStreetNumberError(streetNumber))
    }

    static validate(streetNumber: string): boolean {
        if (!streetNumber || streetNumber.length > 9 || isNaN(parseInt(streetNumber)) || parseInt(streetNumber) < 1) {
            return false
        }
        return true
    }
}