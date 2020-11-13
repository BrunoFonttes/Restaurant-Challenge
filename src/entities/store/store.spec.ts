import { left } from '../../shared/either'
import { Store } from './store'
import { storeMock } from './store-mock'

import { InvalidNameError } from './errors/invalid-name'
import { InvalidPictureError } from '../shared/errors/invalid-picture'
import { InvalidCountryError } from './address/errors/invalid-country'
import { InvalidCountryCodeError } from './address/errors/invalid-country-code'
import { InvalidStateAbbrError } from './address/errors/invalid-state-abbr'
import { InvalidCityError } from './address/errors/invalid-city'
import { InvalidZipCodeError } from './address/errors/invalid-zip-code'
import { InvalidStreetNameError } from './address/errors/invalid-street-name'
import { InvalidStreetNumberError } from './address/errors/invalid-street-number'

describe('Store domain entity', () => {
  describe('should not create store with invalid name', () => {
    test('too few characters', async () => {
      const name = 'O'
      const storeMockInstance = storeMock()
      storeMockInstance.name = name
      const store = Store.create(storeMockInstance)
      expect(store).toEqual(left(new InvalidNameError(name)))
    })

    test('too many characters', async () => {
      let name: string = ''
      for (let i = 0; i < 256; i++) {
        name += 'c'
      }
      const storeMockInstance = storeMock()
      storeMockInstance.name = name
      const store = Store.create(storeMockInstance)
      expect(store).toEqual(left(new InvalidNameError(name)))
    })

    test('only blank spaces', async () => {
      const name = '   '
      const storeMockInstance = storeMock()
      storeMockInstance.name = name
      const store = Store.create(storeMockInstance)
      expect(store).toEqual(left(new InvalidNameError(name)))
    })
  })
  test('should not create store with invalid picture', () => {
    const picture = 'O'
    const storeMockInstance = storeMock()
    storeMockInstance.picture = picture
    const store = Store.create(storeMockInstance)
    expect(store).toEqual(left(new InvalidPictureError()))
  })
  describe('should not create store with invalid address', () => {

    describe('should not create store with invalid country', () => {
      test('too few characters', async () => {
        const country = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.country = country
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryError(country)))
      })

      test('too many characters', async () => {
        let country: string = ''
        for (let i = 0; i < 256; i++) {
          country += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.country = country
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryError(country)))
      })

      test('only blank spaces', async () => {
        const country = '   '
        const storeMockInstance = storeMock()
        storeMockInstance.address.country = country
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryError(country)))
      })

      test('not allowed country', async () => {
        let country: string = ''
        for (let i = 0; i < 100; i++) {
          country += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.country = country
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryError(country)))
      })

    })
    describe('should not create store with invalid countryCode', () => {
      test('too few characters', async () => {
        const countryCode = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.countryCode = countryCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryCodeError(countryCode)))
      })

      test('too many characters', async () => {
        let countryCode: string = ''
        for (let i = 0; i < 256; i++) {
          countryCode += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.countryCode = countryCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryCodeError(countryCode)))
      })

      test('only blank spaces', async () => {
        const countryCode = '   '
        const storeMockInstance = storeMock()
        storeMockInstance.address.countryCode = countryCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryCodeError(countryCode)))
      })

      test('not allowed countryCode', async () => {
        const countryCode = 'OP'
        const storeMockInstance = storeMock()
        storeMockInstance.address.countryCode = countryCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCountryCodeError(countryCode)))
      })

    })
    describe('should not create store with invalid stateAbbr', () => {
      test('too few characters', async () => {
        const stateAbbr = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.stateAbbr = stateAbbr
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStateAbbrError(stateAbbr)))
      })
      test('too many characters', async () => {
        let stateAbbr: string = ''
        for (let i = 0; i < 256; i++) {
          stateAbbr += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.stateAbbr = stateAbbr
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStateAbbrError(stateAbbr)))
      })

      test('only blank spaces', async () => {
        const stateAbbr = '   '
        const storeMockInstance = storeMock()
        storeMockInstance.address.stateAbbr = stateAbbr
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStateAbbrError(stateAbbr)))
      })

      test('not allowed stateAbbr', async () => {
        const stateAbbr = 'ZU'
        const storeMockInstance = storeMock()
        storeMockInstance.address.stateAbbr = stateAbbr
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStateAbbrError(stateAbbr)))
      })
    })
    describe('should not create store with invalid city', () => {
      test('too few characters', async () => {
        const city = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.city = city
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCityError(city)))
      })
      test('too many characters', async () => {
        let city: string = ''
        for (let i = 0; i < 256; i++) {
          city += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.city = city
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCityError(city)))
      })

      test('only blank spaces', async () => {
        const city = '   '
        const storeMockInstance = storeMock()
        storeMockInstance.address.city = city
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCityError(city)))
      })

      test('not allowed City', async () => {
        const city = 'Nossa Cidade'
        const storeMockInstance = storeMock()
        storeMockInstance.address.city = city
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidCityError(city)))
      })
    })
    describe('should not create store with invalid zipCode', () => {
      test('not 8 characters', async () => {
        const zipCode = '123'
        const storeMockInstance = storeMock()
        storeMockInstance.address.zipCode = zipCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidZipCodeError(zipCode)))
      })
      test('not a string number', async () => {
        let zipCode = ''
        for (let i = 0; i < 8; i++) {
          zipCode += 'a'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.zipCode = zipCode
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidZipCodeError(zipCode)))
      })
    })
    describe('should not create store with invalid streetName', () => {
      test('too few characters', async () => {
        const streetName = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetName = streetName
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNameError(streetName)))
      })

      test('too many characters', async () => {
        let streetName: string = ''
        for (let i = 0; i < 256; i++) {
          streetName += 'c'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetName = streetName
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNameError(streetName)))
      })

      test('only blank spaces', async () => {
        const streetName = '   '
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetName = streetName
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNameError(streetName)))
      })
    })
    describe('should not create store with invalid streetNumber', () => {
      test('number too smal', async () => {
        const streetNumber = '-1'
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetNumber = streetNumber
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNumberError(streetNumber)))
      })
      test('number too big', async () => {
        let streetNumber = ''
        for (let i = 0; i < 11; i++) {
          streetNumber += '9'
        }
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetNumber = streetNumber
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNumberError(streetNumber)))
      })
      test('not a string number', async () => {
        const streetNumber = 'O'
        const storeMockInstance = storeMock()
        storeMockInstance.address.streetNumber = streetNumber
        const store = Store.create(storeMockInstance)
        expect(store).toEqual(left(new InvalidStreetNumberError(streetNumber)))
      })

    })
  })


  test('should create store', () => {
    const storeMockInstance = storeMock()
    const store = Store.create(storeMockInstance)
    expect(store.isRight()).toEqual(true)
  })
})
