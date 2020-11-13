import { Either, left, right } from "../../../shared/either"
import { InvalidStateAbbrError } from "./errors/invalid-state-abbr"

export class StateAbbr {
    static allowedStateAbbrs: Array<string> = ['RJ', 'SP']
    private constructor(private readonly stateAbbr: string) {
    }

    get value(): string {
        return this.stateAbbr
    }

    static create(stateAbbr: string): Either<InvalidStateAbbrError, StateAbbr> {
        if (StateAbbr.validate(stateAbbr)) {
            return right(new StateAbbr(stateAbbr))
        }
        return left(new InvalidStateAbbrError(stateAbbr))
    }

    static validate(stateAbbr: string): boolean {
        if (!stateAbbr || stateAbbr.trim().length !== 2|| StateAbbr.allowedStateAbbrs.findIndex(element => element === stateAbbr) === -1) {
            return false
        }
        return true
    }
}