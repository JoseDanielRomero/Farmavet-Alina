import '../stylesheets/Navbar.css'
import logo from '../images/logo-simple.png'
import { Link } from 'react-router-dom';
import arrowIcon from '../images/arrow-down.png'
import cartIcon from '../images/shopping-cart.png'
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';

function Navbar() {

  const { cartState } = useContext(CartContext)
  const [cartLength, setCartLength] = useState([])

  useEffect(()=>{

    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    setCartLength(cartList)

  },[cartState])

  const hanldeClassCounter = cartLength.length === 0 ? 'cart-counter hidden' : 'cart-counter show'

  return (
    <nav className='navbar-container'>
      <Link to='/' className='logo-box'>
        <img className='logo-image' src={logo} />
        <h3 className='logo-text'>Farmacia Veterinaria Alina</h3>
      </Link>
      <div className='nav-items-box'>
        <ul className='nav-items-list'>
          <li className='shop-box'>
            <Link to='/tienda'><h4 className='nav-item shop'>Tienda<img src={arrowIcon} className='arrow-icon' /></h4></Link>
            <div className='nav-item-shop-box'>
              <ul className='nav-items-list-shop'>
              <li><Link to='/desparasitantes'><h4 className='nav-item mini'>Desparasitantes</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/antibioticos'><h4 className='nav-item mini'>Antibióticos</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/vitaminas'><h4 className='nav-item mini'>Vitaminas</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/antiinflamatorio'><h4 className='nav-item mini'>Antiinflamatorio</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/vacunas'><h4 className='nav-item mini'>Vacunas</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/alimentacion'><h4 className='nav-item mini'>Alimentación</h4></Link></li>
              <hr className='divider'></hr>
              <li><Link to='/cuidado-animal'><h4 className='nav-item mini'>Cuidado Animal</h4></Link></li>
              </ul>
            </div>
          </li>
          <li><Link to='/marcas'><h4 className='nav-item'>Marcas</h4></Link></li>
          <li><Link to='/'><h4 className='nav-item'>Nosotros</h4></Link></li>
        </ul>
      </div>
      <Link to='/carrito' className='cart-box'>
        <div className={hanldeClassCounter}>{cartLength.length}</div>
        <img src={cartIcon} className='cart-icon' />
      </Link>
    </nav>
  )
}

export default Navbar;