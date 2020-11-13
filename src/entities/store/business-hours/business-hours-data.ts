import { OneDayBusinessHours } from "./one-day-business-hours";

export interface BusinessHoursInputData {
    mondayToFriday: {
        openingTime: string
        closingTime: string
    },
    weekend: {
        openingTime: string
        closingTime: string
    }
}


export interface BusinessHoursOutputData {
    mondayToFriday: OneDayBusinessHours
    weekend: OneDayBusinessHours
}