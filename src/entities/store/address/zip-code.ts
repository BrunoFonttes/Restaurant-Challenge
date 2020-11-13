import { Either, left, right } from "../../../shared/either"
import { InvalidZipCodeError } from "./errors/invalid-zip-code"

export class ZipCode {
    private constructor(private readonly zipCode: string) {
    }

    get value(): string {
        return this.zipCode
    }

    static create(zipCode: string): Either<InvalidZipCodeError, ZipCode> {
        if (ZipCode.validate(zipCode)) {
            return right(new ZipCode(zipCode))
        }
        return left(new InvalidZipCodeError(zipCode))
    }

    static validate(zipCode: string): boolean {
        if (!zipCode || zipCode.length!=8 || isNaN(parseInt(zipCode))) {
            return false
        }
        return true
    }
}