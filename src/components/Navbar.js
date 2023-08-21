import '../stylesheets/Navbar.css'
import logo from '../images/logo-simple.png'
import { Link } from 'react-router-dom';
import arrowIcon from '../images/arrow-down.png'
import cartIcon from '../images/shopping-cart.png'

function Navbar() {
  return (
    <nav className='navbar-container'>
      <div className='logo-box'>
        <img className='logo-image' src={logo} />
        <h3 className='logo-text'>Farmacia veterinaria Alina</h3>
      </div>
      <div className='nav-items-box'>
        <ul className='nav-items-list'>
          <li className='shop-box'>
            <h4 className='nav-item shop'>Tienda<img src={arrowIcon} className='arrow-icon' /></h4>
            <div className='nav-item-shop-box'>
              <ul className='nav-items-list-shop'>
              
              </ul>
            </div>
          </li>
          <li><Link to='/'><h4 className='nav-item'>Marcas</h4></Link></li>
          <li><Link to='/'><h4 className='nav-item'>Nosotros</h4></Link></li>
        </ul>
      </div>
      <div className='cart-box'>
        <img src={cartIcon} className='cart-icon' />
      </div>
    </nav>
  )
}

export default Navbar;