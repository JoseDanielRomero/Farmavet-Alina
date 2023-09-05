import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../stylesheets/PaymentConfirmation.css'
import checkLogo from '../images/check.png'
import { useContext } from 'react';
import { MenuStatusContext, OrderConfirmedContext } from '../App';
import { Navigate } from 'react-router-dom';

function PaymentConfirmation() {

  const { orderConfirmation } = useContext(OrderConfirmedContext)

  const { menuState, setMenuState } = useContext(MenuStatusContext)

  const handleMenuStatus = () => {
    if (menuState === true) {
      setMenuState(false)
    }
  }

  if (orderConfirmation === true) {
    return (
      <div className='PaymentConfirmation' onClick={handleMenuStatus}>
        <Navbar />
        <header className='header-cart-container'>
          <h1 className='header-cart-title'>Orden confirmada</h1>
        </header>
        <main className='main-confirmation-container'>
          <img src={checkLogo} className='main-confirmation-image' />
          <p className='main-confirmation-text'>Gracias por comprar con nosotros. Ahora que su pedido está confirmado estará listo para ser enviado en 2 días. Por favor, compruebe su bandeja de entrada en el futuro para las actualizaciones de su pedido.</p>
        </main>
        <Footer />
      </div>
    )
  } else {
    return (
      <Navigate to='/' />
    )
  }
}

export default PaymentConfirmation;