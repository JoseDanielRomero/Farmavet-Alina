import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CartContext, TempCheckoutContext } from '../App';
import '../stylesheets/CheckoutPage.css'
import logo from '../images/logo-simple.png'

function CheckoutPage() {

  const { cartState, setCartState } = useContext(CartContext)
  const [cartUpdated, setCartUpdated] = useState([])
  const { tempCheckout } = useContext(TempCheckoutContext)

  useEffect(()=>{

    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    setCartUpdated(cartList)

  },[cartState])

  const cartListWithTaxes = cartUpdated.map(function(product) {
    if (product.iva === true) {
      const price = Number(product.price)
      const priceWithQuantity = price * product.quantity
      const percentage = Math.floor(priceWithQuantity*12)/100
      return percentage
    } else {
      return 0
    }
  })

  const cartListPrices = cartUpdated.map(function(product) {
    const priceWithQuantity = Number(product.price) * product.quantity
    return priceWithQuantity
  })

  const sumArray = (array) => {
    let total = 0;
    for (let i=0; i < array.length; i++) {
      total += array[i] 
    }
    if (total === 0) {
      return '0.00'
    } else {
      return total.toFixed(2)
    }
  }

  if (tempCheckout) {
    return (
      <div className='CheckoutPage'>
        <main className='main-checkout-container'>
          <article className='main-checkout-form-container'>
            <Link to='/' className='logo-checkout-box'>
              <img className='logo-checkout-image' src={logo} />
              <h3 className='logo-checkout-text'>Farmacia Veterinaria Alina</h3>
            </Link>
          </article>
          <article className='main-checkout-cart-container'>
            <section className='main-checkout-cart-box'>
              {cartUpdated.map(product => (
                <div className='main-checkout-cart-product' key={product.id}>
                  <p className='main-checkout-cart-product-text name'>{product.name} (x{product.quantity})</p>
                  <p className='main-checkout-cart-product-text price'>${product.price}</p>
                </div>
              ))}
            </section>
            <hr className='checkout-divider' />
            <section className='main-checkout-cart-box'>
              <div className='main-checkout-cart-product'>
                <p className='main-checkout-cart-product-text item'>Iva:</p>
                <p className='main-checkout-cart-product-text item-price'>${sumArray(cartListWithTaxes)}</p>
              </div>
              <div className='main-checkout-cart-product'>
                <p className='main-checkout-cart-product-text item'>Subtotal:</p>
                <p className='main-checkout-cart-product-text item-price'>${sumArray(cartListPrices)}</p>
              </div>
              <div className='main-checkout-cart-product'>
                <p className='main-checkout-cart-product-text item'>Envío:</p>
                <p className='main-checkout-cart-product-text shipping'>Será calculado en el próximo paso</p>
              </div>
            </section>
            <hr className='checkout-divider' />
            <section className='main-checkout-cart-total-box'>
              <div className='main-checkout-cart-product'>
                <p className='main-checkout-cart-product-text item'>Total:</p>
                <p className='main-checkout-cart-product-text total-price'>
                  ${(Number(sumArray(cartListWithTaxes))+Number(sumArray(cartListPrices))).toFixed(2)}
                </p>
              </div>
            </section>
          </article>
        </main>

      </div>
    )
  } else {
    return (
      <Navigate to='/carrito' />
    )
  }
}

export default CheckoutPage;