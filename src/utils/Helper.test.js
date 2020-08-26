import React from 'react'
import { configure, mount, shallow, render } from 'enzyme'
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

import Helpers from './Helpers'

describe("Helper", () => {

	it('returns dollars from number', () => {
		const rate = Helpers.convert(1499)

		expect(rate).toEqual("$14.99")
    })

    it('returns null if trying to convert from not a number', () => {
		const rate = Helpers.convert("abc")

		expect(rate).toEqual(null)
    })

    it('returns null if number is 0', () => {
		const rate = Helpers.convert(0)

		expect(rate).toEqual(null)
	})

})