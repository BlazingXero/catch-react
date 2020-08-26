import React from 'react'
import Helpers from '../../utils/Helpers'

const Products = ({products}) => {
  if (!products) {
    return "No Products"
  }

  return (
    <>
      {products.map(product => {
        const isSoldOut = product.quantityAvailable === 0
        return (
          <div className="product-wrapper" key={product.id}>
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
              {isSoldOut && <div className="sold-out">SOLD OUT</div>}
            </div>
            <div className="product-details">
              <div className="product-name" title={product.name}>
                {product.name}
              </div>
              <div className="retail-price">
                {Helpers.convert(product.retailPrice)}
              </div>
              <div className="product-price">
                {Helpers.convert(product.salePrice)}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Products