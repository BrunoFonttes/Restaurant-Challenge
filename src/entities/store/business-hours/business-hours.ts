import { OneDayBusinessHours } from "./one-day-business-hours";
import { BusinessHoursOutputData, BusinessHoursInputData } from "./business-hours-data";
import { Either, left, right } from "../../../shared/either";
import { InvalidOneDayBusinessHoursError } from "./errors/invalid-one-day-business-hours";

export class BusinessHours {
    private constructor(private readonly mondayToFriday: OneDayBusinessHours, private readonly weekend?: OneDayBusinessHours) {
        Object.freeze(this)
    }
    get value(): BusinessHoursOutputData {
        return {
            mondayToFriday: this.mondayToFriday,
            weekend: this.weekend
        }
    }
    static create(businessHoursInputData: BusinessHoursInputData):
        Either<InvalidOneDayBusinessHoursError, BusinessHours> {
        const mondayToFridayOrError:
            Either<InvalidOneDayBusinessHoursError, OneDayBusinessHours> = OneDayBusinessHours.create(businessHoursInputData.mondayToFriday)
        const weekendOrError:
            Either<InvalidOneDayBusinessHoursError, OneDayBusinessHours> = OneDayBusinessHours.create(businessHoursInputData.weekend)
        if (mondayToFridayOrError.isLeft()) {
            return left(mondayToFridayOrError.value)
        }
        if (weekendOrError.isLeft()) {
            return left(weekendOrError.value)
        }
        return right(new BusinessHours(mondayToFridayOrError.value, weekendOrError.value))
    }
}