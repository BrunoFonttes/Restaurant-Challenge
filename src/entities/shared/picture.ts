import { Either, right, left } from "../../shared/either";
import { InvalidPictureError } from "./errors/invalid-picture";
import btoa from 'btoa'
import atob from 'atob'

export class Picture {
    private constructor(private picture: string) {
    }

    get value(): string {
        return this.picture
    }
    static create(picture: string): Either<InvalidPictureError, Picture> {
        if (!Picture.validate(picture)) {
            return left(new InvalidPictureError())
        }
        return right(new Picture(picture))
    }

    static validate(picture: string): boolean {
        if (!picture || !(btoa(atob(picture)) === picture)) {
            return false
        }
        return true
    }
}