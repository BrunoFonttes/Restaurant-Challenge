import { Either, left, right } from "../../shared/either";
import { HoursData } from "./hours-data";
import { InvalidHoursError } from "./errors/invalid-hours";

export class Hours {
    constructor(private hour: number, private minute: number) {

    }

    get value(): HoursData {
        const hoursData: HoursData = {
            hour: this.hour,
            minute: this.minute
        }
        return hoursData
    }

    static create(hours: string): Either<InvalidHoursError, Hours> {
        const hoursDataOrFalse:Either<boolean, HoursData> = Hours.validate(hours)
        if (hoursDataOrFalse.isLeft()) {
            return left(new InvalidHoursError(hours))
        }
        return right(new Hours(hoursDataOrFalse.value.hour, hoursDataOrFalse.value.minute))
    }

    static validate(hours: string): Either<boolean, HoursData> {
        if (!hours || hours.length !== 5) {
            return left(false)
        }
        const parsedHours: Array<string> = hours.split(':')
        if (parsedHours.length !== 2) {
            return left(false)
        }
        const hour: number = parseInt(parsedHours[0])
        const minute: number = parseInt(parsedHours[1])
        if (isNaN(hour) || isNaN(minute) || hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
            return left(false)
        }
        const hoursData:HoursData ={
            hour: hour,
            minute: minute
        }
        return right(hoursData)
    }
}