import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CartContext, MenuStatusContext, OrderConfirmedContext, TempCheckoutContext } from '../App';
import '../stylesheets/CheckoutPage.css'
import logo from '../images/logo-simple.png'
import { Formik, Form, Field } from 'formik';

function CheckoutPage() {

  const { cartState } = useContext(CartContext)
  const [cartUpdated, setCartUpdated] = useState([])
  const [shippingInfo, setShippingInfo] = useState([])
  const { tempCheckout, setTempCheckout } = useContext(TempCheckoutContext)
  const { setOrderConfirmation } = useContext(OrderConfirmedContext)

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

  const cancelCheckout = () => {
    setTempCheckout(false)
  }

  const handleSubmitShipping = (values, {resetForm}) => {
    setShippingInfo([values])
    resetForm({ values: '' })
  }

  const handleSubmitCard = (values, {resetForm}) => {
    resetForm({ values: '' })
    setShippingInfo([])
    setOrderConfirmation(true)
    localStorage.removeItem('cart');
    window.location.href = '/Farmavet-Alina/#/confirmacion'
  }

  const handleShippingPhrase = shippingInfo.length === 0 ? 'Será calculado en el próximo paso' : 'Envío gratis'

  const { menuState, setMenuState } = useContext(MenuStatusContext)

  const handleMenuStatus = () => {
    if (menuState === true) {
      setMenuState(false)
    }
  }

  if (tempCheckout) {
    return (
      <div className='CheckoutPage' onClick={handleMenuStatus}>
        <main className='main-checkout-container'>
          <article className='main-checkout-form-container'>
            <section className='header-checkout-form'>
              <Link to='/' className='logo-checkout-box' onClick={cancelCheckout}>
                <img className='logo-checkout-image' src={logo} />
                <h3 className='logo-checkout-text'>Farmacia Veterinaria Alina</h3>
              </Link>
            </section>
            {shippingInfo.length === 0 &&
              <Formik initialValues={{
                name:'',
                lastName:'',
                country:'Ecuador',
                province:'',
                city:'',
                address:'',
                email:'',
                phone:''
              }}
              onSubmit={ handleSubmitShipping }
              >
                <Form className='main-checkout-form-box'>
                  <div className='header-checkout-form-box'>
                    <h3 className='header-checkout-form-title'>Datos de envío</h3>
                  </div>
                  <div className='main-checkout-form-section'>
                    <Field name='name' type='text' placeholder='Nombre' className='form-field half' autoComplete='off' required />
                    <Field name='lastName' type='text' placeholder='Apellido' className='form-field half' autoComplete='off' required />
                  </div>
                  <div className='main-checkout-form-section'>
                    <Field name='country' type='text' placeholder='País/región' className='form-field one-third' autoComplete='off' required readOnly />
                    <Field name='province' type='text' placeholder='Provincia' className='form-field one-third' autoComplete='off' required />
                    <Field name='city' type='text' placeholder='Ciudad' className='form-field one-third' autoComplete='off' required />
                  </div>
                  <Field name='address' type='text' placeholder='Dirección' className='form-field complete' autoComplete='off' required />
                  <Field name='email' type='email' placeholder='Correo electrónico' className='form-field complete' autoComplete='off' required />
                  <Field name='phone' type='tel' maxLength='10' placeholder='Teléfono' className='form-field complete' autoComplete='off' required />
                  <div className='main-checkout-form-section button-section'>
                    <Link to='/carrito' className='form-checkout-link'>Regresar al carrito</Link>
                    <button type='submit' className='form-checkout-button'>
                      <p className='main-cart-checkout-text'>Proceder a pagar</p>
                    </button>
                  </div>
                </Form>
              </Formik>
            }
            {shippingInfo.length > 0 &&
              <Formik initialValues={{
                cardNumber:'',
                holderName:'',
                expiration:'',
                cvv:''
              }}
              onSubmit={ handleSubmitCard }
              >
                <Form className='main-checkout-form-box'>
                  <div className='header-checkout-form-box'>
                    <h3 className='header-checkout-form-title'>Método de pago</h3>
                  </div>
                  <Field name='cardNumber' type='tel' maxLength='18' placeholder='Número de tarjeta' className='form-field complete' autoComplete='off' required />
                  <Field name='holderName' type='text' placeholder='Titular de tarjeta' className='form-field complete' autoComplete='off' required />
                  <div className='main-checkout-form-section'>
                    <Field name='expiration' type='tel' maxLength='5' placeholder='Expiración' className='form-field half' autoComplete='off' required />
                    <Field name='cvv' type='password' maxLength='3' placeholder='CVV' className='form-field half' autoComplete='off' required />
                  </div>
                  <div className='main-checkout-form-section button-section'>
                    <Link to='/carrito' className='form-checkout-link'>Regresar al carrito</Link>
                    <button type='submit' className='form-checkout-button'>
                      <p className='main-cart-checkout-text'>Finalizar la compra</p>
                    </button>
                  </div>
                </Form>
              </Formik>
            }
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
                <p className='main-checkout-cart-product-text shipping'>{handleShippingPhrase}</p>
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