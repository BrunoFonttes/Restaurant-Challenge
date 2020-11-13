import { BusinessHoursInputData } from "./business-hours/business-hours-data";
import { AddressInputData } from "./address/address-data";

export interface StoreData {
    name: string
    address: AddressInputData,
    picture: string,
    businessHours: BusinessHoursInputData
}