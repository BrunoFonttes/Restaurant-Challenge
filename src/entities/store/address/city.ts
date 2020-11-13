import { Either, left, right } from "../../../shared/either"
import { InvalidCityError } from "./errors/invalid-city"

export class City {
    static allowedCities: Array<string> = ['Rio de Janeiro', 'São Paulo']
    private constructor(private readonly city: string) {
    }
    
    get value(): string {
        return this.city
    }

    static create(city: string): Either<InvalidCityError, City> {
        if (City.validate(city)) {
            return right(new City(city))
        }
        return left(new InvalidCityError(city))
    }

    static validate(city: string): boolean {
        if (!city || city.trim().length < 2 || city.trim().length > 255|| City.allowedCities.findIndex(element => element === city) === -1) {
            return false
        }
        return true
    }
}