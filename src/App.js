import React, { Component } from 'react'

import Products from './components/Product/Product'

const APIBASEURL = "http://catch-code-challenge.s3-website-ap-southeast-2.amazonaws.com/challenge-3/response.json"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: [
        {name: "Price (low-high)", type: "salePrice", order: "asc"},
        {name: "Price (high-low)", type: "salePrice", order: "desc"}
      ],
      currentSort: 0,
      products: {}
    }

    this.handleChangeSort = this.handleChangeSort.bind(this)
  }

  async fetchProducts() {
    try {
      const response = await fetch(APIBASEURL)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      return json

    } catch (error) {
      console.info(error)
    }
  }

  componentDidMount() {
    this.fetchProducts()
      .then((fetchedData) => {
        this.setState({ products: fetchedData})
        this.handleChangeSort(this.state.currentSort)
      })
  }

  handleChangeSort = (index) => {
    const thisSort = this.state.sort[index]

    let products = this.state.products

    products.results = [].concat(products.results)
      .sort((a, b) => a[thisSort.type] > b[thisSort.type] ? 1 : -1)

    if (thisSort.order === "desc") {
      Array.prototype.reverse.call(products.results)
    }

    this.setState({currentSort: index})
    this.setState({products: products})
  }

  renderSortProducts = () => {
    const { sort } = this.state
    return (
      <>
        {sort.map((option, index) => {
          return (
            <option key={index} value={index}>{option.name}</option>
          )
        })}
      </>
    )
  }

  render() {
    const { products, currentSort } = this.state

    if (Object.keys(products).length === 0) {
      return null
    }

    return (
      <div className="container">
        <div className="header">
          <div className="logo">
            <div className="logo-wrapper">
              <img src="https://s.catch.com.au/static/catch/images/logo-83d9b21199.svg" alt="Catch" />
            </div>
            <div className="product-title">
              <h1>{products.metadata.query}</h1>
            </div>
          </div>
          <div className="filter">
            <select id="change-sort" onChange={(e) => this.handleChangeSort(e.target.value)} value={currentSort}>
              {this.renderSortProducts()}
            </select>
          </div>
        </div>
        <div className="product-list">
          <Products products={products.results} />
        </div>
        <div className="products-bottom">
          <div className="left">Page <b>{products.metadata.page}</b> of <b>{products.metadata.pages}</b></div>
          <div className="right">Showing <b>{products.results.length}</b> of <b>{products.metadata.total}</b></div>
        </div>
      </div>
    )
  }
}