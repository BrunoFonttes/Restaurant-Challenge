import { Either, left, right } from "../../shared/either";
import { InvalidNameError } from "./errors/invalid-name";
import { InvalidPictureError } from "../shared/errors/invalid-picture";
import { InvalidCountryCodeError } from "./address/errors/invalid-country-code";
import { InvalidCountryError } from "./address/errors/invalid-country";
import { InvalidStateAbbrError } from "./address/errors/invalid-state-abbr";
import { InvalidCityError } from "./address/errors/invalid-city";
import { InvalidZipCodeError } from "./address/errors/invalid-zip-code";
import { InvalidStreetNameError } from "./address/errors/invalid-street-name";
import { InvalidStreetNumberError } from "./address/errors/invalid-street-number";
import { InvalidOneDayBusinessHoursError } from "./business-hours/errors/invalid-one-day-business-hours";
import { StoreData } from "./store-data";
import { Name } from "./name";
import { Picture } from "../shared/picture";
import { BusinessHours } from "./business-hours/business-hours";
import { Address } from "./address/address";

export class Store {
    protected constructor(public  name: Name,
        public picture: Picture,
        public businessHours: BusinessHours,
        public address: Address) {
            Object.freeze(this)
    }

    static create(storeData: StoreData):
        Either<InvalidNameError |
            InvalidPictureError |
            InvalidCountryCodeError |
            InvalidCountryError |
            InvalidStateAbbrError |
            InvalidCityError |
            InvalidZipCodeError |
            InvalidStreetNameError |
            InvalidStreetNumberError |
            InvalidOneDayBusinessHoursError, Store> {
        const nameOrError: Either<InvalidNameError, Name> = Name.create(storeData.name)
        const pictureOrError: Either<InvalidPictureError, Picture> = Picture.create(storeData.picture)
        const businessHoursOrError: Either<InvalidOneDayBusinessHoursError, BusinessHours> = BusinessHours.create(storeData.businessHours)
        const addressOrError: Either<InvalidCountryCodeError |
            InvalidCountryError |
            InvalidStateAbbrError |
            InvalidCityError |
            InvalidZipCodeError |
            InvalidStreetNameError |
            InvalidStreetNumberError, Address> = Address.create(storeData.address)
        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }
        if (pictureOrError.isLeft()) {
            return left(pictureOrError.value)
        }
        if (businessHoursOrError.isLeft()) {
            return left(businessHoursOrError.value)
        }
        if (addressOrError.isLeft()) {
            return left(addressOrError.value)
        }
        return right(new Store(nameOrError.value, pictureOrError.value, businessHoursOrError.value, addressOrError.value))
    }
}