import { Hours } from "../../shared/hours";
import { OneDayBusinessHoursOutputData, OneDayBusinessHoursInputData } from "./one-day-business-hours-data";
import { Either, left, right } from "../../../shared/either";
import { InvalidOneDayBusinessHoursError } from "./errors/invalid-one-day-business-hours";
import { InvalidHoursError } from "../../shared/errors/invalid-hours";

export class OneDayBusinessHours {
    static allowedOfficeHours: number = 15
    private constructor(
        private readonly openingTime: Hours,
        private readonly closingTime: Hours) {
            Object.freeze(this)
    }
    get value(): OneDayBusinessHoursOutputData {
        return {
            openingTime: this.openingTime,
            closingTime: this.closingTime
        }
    }

    static create(oneDayBusinessHoursInputData: OneDayBusinessHoursInputData): Either<InvalidOneDayBusinessHoursError, OneDayBusinessHours> {
        const openingTimeOrInvalidHours: Either<InvalidHoursError, Hours> = Hours.create(oneDayBusinessHoursInputData.openingTime)
        const closingTimeOrInvalidHours: Either<InvalidHoursError, Hours> = Hours.create(oneDayBusinessHoursInputData.closingTime)
        if (openingTimeOrInvalidHours.isLeft()) {
            return left(openingTimeOrInvalidHours.value)
        }
        if (closingTimeOrInvalidHours.isLeft()) {
            return left(closingTimeOrInvalidHours.value)
        }
        if (!OneDayBusinessHours.validate(openingTimeOrInvalidHours.value, closingTimeOrInvalidHours.value)) {
            return left(new InvalidOneDayBusinessHoursError(oneDayBusinessHoursInputData.openingTime, oneDayBusinessHoursInputData.closingTime))
        }
        return right(new OneDayBusinessHours(openingTimeOrInvalidHours.value, closingTimeOrInvalidHours.value))
    }

    static validate(openingTime: Hours, closingTime: Hours): boolean {
        const officeHours: number = (closingTime.value.hour * 60 + closingTime.value.minute) - (openingTime.value.hour * 60 + openingTime.value.minute)
        /**
         * Se o horário de expediente for inferior a 15 minutos, ou o horário de abertura for mais tarde que o horário de fechamento, retorna erro
         */
        console.log(openingTime,closingTime, (closingTime.value.hour * 60 + closingTime.value.minute), (openingTime.value.hour * 60 + openingTime.value.minute))
        if (officeHours < OneDayBusinessHours.allowedOfficeHours) {
            return false
        }
        return true
    }
}