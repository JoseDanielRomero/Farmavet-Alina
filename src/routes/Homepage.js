import data from '../data.json';
import Navbar from '../components/Navbar'
import '../stylesheets/Homepage.css'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import cartIcon from '../images/shopping-cart-2.png'
import plusIcon from '../images/plus.png'
import { useContext } from 'react';
import { CartContext } from '../App';
import storeIcon from '../images/store.png'
import bagIcon from '../images/bag.png'
import deliverIcon from '../images/deliver.png'
import payIcon from '../images/pay.png'

function Homepage() {

  const { cartState, setCartState } = useContext(CartContext)

  const bestProductsDatabase = () => {
    const database = [...data]
    return database.slice(42, 46)
  }

  const handleClickAddCart = (productObj) => {

    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    const copyCart = [...cartList]
    const copyProduct = {...productObj}
    const findIdx = copyCart.findIndex(element => element.id === productObj.id)

    if (findIdx === -1) {
      copyProduct.quantity = 1
      copyCart.push(copyProduct)
      localStorage.setItem('cart', JSON.stringify(copyCart))
    } else {
      const actualQuantity = copyCart[findIdx].quantity
      if (actualQuantity < 5) {
        copyCart[findIdx].quantity = copyCart[findIdx].quantity + 1
      }
      localStorage.setItem('cart', JSON.stringify(copyCart))
    }
    setCartState(cartList)
  }

  return (
    <div className='Homepage'>
      <Navbar />
      <header className='header-homepage'>
        <div className='header-text-box'>
          <h1 className='header-title'>Somos tú Farmacia Veterinaria<br></br> de confianza</h1>
          <p className='header-subtitle'>Estamos aquí para ofrecerte una amplia gama de marcas líderes en medicamentos para mascotas y otros productos de alimentación y vestido.</p>
        </div>
      </header>
      <main className='main-homepage-container'>
        <article className='main-homepage-best-products-box'>
          <h3 className='main-homepage-best-products-title'>Los más vendidos</h3>
          <div className='main-shop-products-container'>
            {bestProductsDatabase().map(product => {
              const linkTo = '/producto/' + product.id
              return (
                <div key={product.id}>
                  <Link to={linkTo}>
                    <ProductCard 
                      imageId={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  </Link>
                  <button className='product-card-button' onClick={()=>handleClickAddCart(product)} >
                    <img src={cartIcon} className='product-card-cart-icon' />
                    <img src={plusIcon} className='product-card-plus-icon' />
                  </button>
                </div>             
            )})}
          </div>
        </article>
        <article className='main-homepage-features-container'>
          <section className='main-homepage-features-box'>
            <div className='main-homepage-single-feature-box'>
              <div className='feature-image-box'>
                <img src={storeIcon} className='feature-image' />
              </div>
              <div className='feature-text-box'>
                <p className='feature-text'>Tu tienda en línea</p>
              </div>
            </div>
            <div className='main-homepage-single-feature-box'>
              <div className='feature-image-box'>
                <img src={bagIcon} className='feature-image' />
              </div>
              <div className='feature-text-box'>
                <p className='feature-text'>Tu compra garatizada</p>
              </div>
            </div>
            <div className='main-homepage-single-feature-box'>
              <div className='feature-image-box'>
                <img src={deliverIcon} className='feature-image' />
              </div>
              <div className='feature-text-box'>
                <p className='feature-text'>Tu pedido directo al domicilio</p>
              </div>
            </div>
            <div className='main-homepage-single-feature-box'>
              <div className='feature-image-box'>
                <img src={payIcon} className='feature-image' />
              </div>
              <div className='feature-text-box'>
                <p className='feature-text'>Tu método de pago favorito</p>
              </div>
            </div>
            
          </section>
        </article>
      </main>
    </div>
  )
}

export default Homepage