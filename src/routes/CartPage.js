import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';
import Navbar from '../components/Navbar';
import '../stylesheets/CartPage.css'
import closeIcon from '../images/close.png'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import notFoundImage from '../images/not-found-image.png'

function CartPage() {

  const { cartState, setCartState } = useContext(CartContext)
  const [cartUpdated, setCartUpdated] = useState([])

  useEffect(()=>{

    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    setCartUpdated(cartList)

  },[cartState])

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
                  <Link to={linkTo}><p className='main-cart-products-name'>{product.name}</p></Link>
                </div>
                <div className='main-cart-products-box center'>
                  <p className='main-cart-products-name'>${product.price}</p>
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