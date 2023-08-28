import { useContext, useEffect, useState } from 'react';
import { CartContext, TempCheckoutContext } from '../App';
import Navbar from '../components/Navbar';
import '../stylesheets/CartPage.css'
import closeIcon from '../images/close.png'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import notFoundImage from '../images/not-found-image.png'

function CartPage() {

  const { cartState, setCartState } = useContext(CartContext)
  const [cartUpdated, setCartUpdated] = useState([])
  const { setTempCheckout } = useContext(TempCheckoutContext)

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

  const handleClickCheckout = () => {
    setTempCheckout(true)
    window.location.href = '/#/check-out'
  }

  if (cartUpdated.length > 0) {
    return (
      <div className='CartPage'>
        <Navbar />
        <header className='header-cart-container'>
          <h1 className='header-cart-title'>Tú carrito</h1>
        </header>
        <main className='main-cart-container'>
          <article className='main-cart-column-title-container'>
          <div className='main-cart-column-title-box left'>
              <h4 className='main-cart-column-title'>Producto</h4>
            </div>
            <div className='main-cart-column-title-box' />
            <div className='main-cart-column-title-box' />
            <div className='main-cart-column-title-box center'>
              <h4 className='main-cart-column-title'>Precio</h4>
            </div>
            <div className='main-cart-column-title-box center'>
              <h4 className='main-cart-column-title'>Cantidad</h4>
            </div>
            <div className='main-cart-column-title-box center'>
              <h4 className='main-cart-column-title'>Total</h4>
            </div>
          </article>
          {cartUpdated.map(product => {

            const handleClickRemove = () => {

              const cartList = JSON.parse(localStorage.getItem('cart'))
              const findIdx = cartList.findIndex(element => element.id === product.id)

              cartList.splice(findIdx, 1)
              localStorage.setItem('cart', JSON.stringify(cartList))
              setCartState(cartList)

            }

            const linkTo = '/producto/' + product.id
            const total = (Number(product.price) * product.quantity).toFixed(2)

            return (
              <article className='main-cart-products-container' key={product.id}>
                <div className='main-cart-products-box center'>
                  <img src={closeIcon} className='close-icon' onClick={handleClickRemove} />
                </div>
                <div className='main-cart-products-box center'>
                  <div className='main-cart-products-box-image'>
                    <img src={require(`../images/products/${product.id}.png`)} className='main-cart-products-image' />
                  </div>
                </div>
                <div className='main-cart-products-box left'>
                  <Link to={linkTo}><p className='main-cart-products-name hover'>{product.name}</p></Link>
                </div>
                <div className='main-cart-products-box center'>
                  <p className='main-cart-products-name'>${product.price}<br></br>{product.iva === true && '+ IVA'}</p>
                </div>
                <div className='main-cart-products-box center'>
                  <p className='main-cart-products-name'>{product.quantity}</p>
                </div>
                <div className='main-cart-products-box center'>
                  <p className='main-cart-products-name'>${total}</p>
                </div>
              </article>
            )
          })}
          <article className='main-cart-subtotal-container'>
            <section className='main-cart-subtotal-section'>
              <div className='main-cart-iva-box'>
                <h5 className='iva-title'>Iva:</h5>
                <p className='iva-value'>$ {sumArray(cartListWithTaxes)}</p>
              </div>
              <div className='main-cart-subtotal-box'>
                <h5 className='subtotal-title'>Subtotal:</h5>
                <p className='subtotal-value'>$ {sumArray(cartListPrices)}</p>
              </div>
              <div className='main-cart-extra-box'>
                <p className='extra-phrase'>Los costes de envío se calculan en los próximos pasos</p>
              </div>
            </section>
            <section className='main-cart-checkout-section'>
              <button className='main-cart-checkout-button' onClick={handleClickCheckout}>
                <p className='main-cart-checkout-text'>Finalizar compra</p>
              </button>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='CartPage'>
        <Navbar />
        <header className='header-cart-container'>
          <h1 className='header-cart-title'>Tú carrito</h1>
        </header>
        <main className='main-cart-container-empty'>
          <img src={notFoundImage} className='empty-image-adviser' />
          <p className='empty-text-adviser'>El carrito está vacío.</p>
        </main>
        <Footer />
      </div>
    )
  }
}

export default CartPage;