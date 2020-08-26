import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

import Products from './Product'

describe("<Products />", () => {
	let mockProducts

    beforeEach(() => {
        mockProducts = [{
			"id": "ffc4211a-fb81-45e3-b1d8-2d399a92aa89",
			"name": "Buy Olaplex No. 3 Hair Perfector",
			"salePrice": 3145,
			"retailPrice": 5000,
			"imageUrl": "https://s.catch.com.au/images/product/0002/2114/593f690189ac9183721654_w200.jpg",
			"quantityAvailable": 65
    	}]
	})

	it('renders without crashing enzyme', () => {
		const wrapper = shallow(<Products products={mockProducts} />)

		expect(wrapper).toMatchSnapshot()
	})

	it('render no product message when no products is passed', () => {
		const wrapper = shallow(<Products products={null} />)

		expect(wrapper).toMatchSnapshot()
	})
	it('show sold out when quantityAvailable is 0', () => {
		mockProducts[0].quantityAvailable = 0
		const wrapper = shallow(<Products products={mockProducts} />)

		expect(wrapper).toMatchSnapshot()
	})

})