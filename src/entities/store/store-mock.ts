import faker from 'faker'
import { AddressInputData } from './address/address-data'
import { Country } from './address/country'
import { StoreData } from './store-data'
import { CountryCode } from './address/country-code'
import { StateAbbr } from './address/state-code'
import { City } from './address/city'
import { BusinessHoursInputData } from './business-hours/business-hours-data'
import { OneDayBusinessHours } from './business-hours/one-day-business-hours'
import { OneDayBusinessHoursInputData } from './business-hours/one-day-business-hours-data'

const pictureBase64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1miiisxn/2Q=='
const zipCode = (): string => { return `${faker.random.number({ min: 1111111, max: 99999999 })}` }
// const closingTimeInMinutes = (): number => faker.random.number({ min: 0, max: 1439 }) //23:59 em minutos = 1439 minutos
const openingTimeInMinutes = (): number => faker.random.number({ min: 0, max: 1439 - OneDayBusinessHours.allowedOfficeHours })
const closingTimeInMinutes = (openingTimeInMinutes: number): number => faker.random.number({ min: openingTimeInMinutes + OneDayBusinessHours.allowedOfficeHours, max: 1439 })
const hours = (minutes: number): string => {
    const hour: number = Math.floor((minutes) / 60)
    const minute: number = minutes - (hour * 60)
    const hourToString: string = hour < 10 ? `0${hour}` : `${hour}`
    const minuteToString: string = minute < 10 ? `0${minute}` : `${minute}`
    return `${hourToString}:${minuteToString}`
}
const oneDayBusinessHours = (): OneDayBusinessHoursInputData => {
    const openingTimeInMinutesInstance: number = openingTimeInMinutes()
    const closingTimeInMinutesInstance: number = closingTimeInMinutes(openingTimeInMinutesInstance)

    console.log(openingTimeInMinutesInstance, closingTimeInMinutesInstance)

    return {
        openingTime: hours(openingTimeInMinutesInstance),
        closingTime: hours(closingTimeInMinutesInstance)

    }
}

export const addressMock = (): AddressInputData => {
    const zipCodeInstance = zipCode()
    return {
        countryCode: CountryCode.allowedCountryCodes[Math.floor(Math.random() * CountryCode.allowedCountryCodes.length)],
        country: Country.allowedCountry[Math.floor(Math.random() * Country.allowedCountry.length)],
        stateAbbr: StateAbbr.allowedStateAbbrs[Math.floor(Math.random() * StateAbbr.allowedStateAbbrs.length)],
        city: City.allowedCities[Math.floor(Math.random() * City.allowedCities.length)],
        zipCode: zipCodeInstance.length === 7 ? `0${zipCodeInstance}` : zipCodeInstance,
        streetName: faker.address.streetName(),
        streetNumber: `${faker.random.number({ min: 1, max: 999 })}`
    }
}


export const businessHours = (): BusinessHoursInputData => {
    return {
        mondayToFriday: oneDayBusinessHours(),
        weekend: oneDayBusinessHours()
    }

}

export const storeMock = (): StoreData => {
    const name = faker.company.bs()
    return {
        name: name.length <= 2 ? `${faker.company.bs()}!` : name, //Garante que o nome da loja terá sempre mais que 3 caracteres
        address: addressMock(),
        picture: pictureBase64,
        businessHours: businessHours()
    }
}
