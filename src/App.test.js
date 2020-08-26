import React from 'react'
import { configure, mount, shallow, render } from 'enzyme'
import Adapter from "enzyme-adapter-react-16"

import App from './App'

configure({ adapter: new Adapter() })

describe("<App />", () => {
    let mockData
    let mockResponse
    let mockState

    beforeEach(async () => {
        mockData = {
            "metadata": {
                "query": "best sellers",
                "total": 102,
                "page": 1,
                "pages": 3
            },
            "results": [
                {
                "id": "ffc4211a-fb81-45e3-b1d8-2d399a92aa89",
                "name": "Buy Olaplex No. 3 Hair Perfector",
                "salePrice": 3145,
                "retailPrice": 5000,
                "imageUrl": "https://s.catch.com.au/images/product/0002/2114/593f690189ac9183721654_w200.jpg",
                "quantityAvailable": 65
                },
                {
                  "id": "f56cb6f2-a926-4ff4-80be-4518b0d1997d",
                  "name": "Havaianas Top Thongs -  Black",
                  "salePrice": 1499,
                  "retailPrice": 2500,
                  "imageUrl": "https://s.catch.com.au/images/product/0001/1431/57aa8e0fcba93464428129_w200.jpg",
                  "quantityAvailable": 71
                },
                {
                  "id": "46397d56-2726-45de-8514-d8ed6984a600",
                  "name": "4 x 60pk Finish Quantum Max Powerball Super Charged Dishwashing Caps Lemon Sparkle",
                  "salePrice": 5900,
                  "retailPrice": 18417,
                  "imageUrl": "https://s.catch.com.au/images/product/0001/1909/5d47c0d64988e613254534_w200.jpg",
                  "quantityAvailable": 56
                }
            ]
        },
        mockResponse = (status, statusText, response) => {
            return new window.Response(response, {
                status: status,
                statusText: statusText,
                headers: {
                'Content-type': 'application/json'
                }
            })
        },
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(
            200,
            null,
            JSON.stringify(mockData)
        ))),
        mockState = {
            sort: [
              {name: "Price (low-high)", type: "salePrice", order: "asc"},
              {name: "Price (high-low)", type: "salePrice", order: "desc"}
            ],
            currentSort: 0,
            products: {}
        }
	})
    it("renders without crashing", () => {
        const wrapper = shallow(<App />)

        expect(wrapper).toMatchSnapshot()
    })
    it('fetches data from server when server returns a successful response', async () => {
        const wrapper = shallow(<App />)

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith('http://catch-code-challenge.s3-website-ap-southeast-2.amazonaws.com/challenge-3/response.json')
        process.nextTick(() => { // 6
            expect(wrapper.state("products").metadata).toEqual({
                "query": "best sellers",
                "total": 102,
                "page": 1,
                "pages": 3
            })
        })
    })
    it("returns default state when not ok", async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(
            403,
            null,
            JSON.stringify({})
        )))

        const wrapper = shallow(<App />)
        await wrapper.instance().componentDidMount()

        expect(wrapper.state("products")).toEqual({})
    })
    it("returns default state when exception is thrown", async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.reject(undefined))

        const wrapper = shallow(<App />)
        await wrapper.instance().componentDidMount()

        expect(wrapper.state("products")).toEqual({})
    })
    it("state is updated when sort index is changed", () => {
        const wrapper = shallow(<App />)

        mockState.currentSort = 1
        wrapper.setState({...mockState})
        const instance = wrapper.instance()
        expect(wrapper.state("currentSort")).toEqual(1)
    })
    it("updates product sort on select change", () => {
        const wrapper = mount(<App />)

        mockState.products = mockData
        wrapper.setState({...mockState})

        expect(wrapper.find('select').props().value).toBe(0)

        wrapper.find('select').simulate('change', {target: {value: 1}})

        expect(wrapper.find('select').props().value).toBe(1)
    })
})