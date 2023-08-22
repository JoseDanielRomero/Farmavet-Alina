import '../stylesheets/HeaderShop.css'
import petsIcon from '../images/pets-icon.png'

function HeaderShop({ title }) {
  return (
    <header className='header-shop'>
      <img src={petsIcon} className='header-shop-image' />
      <h1 className='header-shop-title'>{title}</h1>
    </header>
  )
}

export default HeaderShop