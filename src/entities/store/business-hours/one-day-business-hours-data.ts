import { Hours } from "../../shared/hours";

export interface OneDayBusinessHoursOutputData{
    openingTime:Hours
    closingTime:Hours
}

export interface OneDayBusinessHoursInputData{
    openingTime:string
    closingTime:string
}