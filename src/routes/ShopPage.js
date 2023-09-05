import data from '../data.json';
import { useContext, useEffect, useState } from 'react';
import HeaderShop from '../components/HeaderShop';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../stylesheets/ShopPage.css'
import { Link } from 'react-router-dom';
import leftArrow from '../images/left-arrow.png'
import rightArrow from '../images/right-arrow.png'
import Footer from '../components/Footer';
import cartIcon from '../images/shopping-cart-2.png'
import plusIcon from '../images/plus.png'
import { CartContext, MenuStatusContext } from '../App';

function ShopPage() {

  const { cartState, setCartState } = useContext(CartContext)

  const options = [
    {value: 'default', text: 'Orden por defecto'},
    {value: 'low', text: 'Ordenar por precio: bajo a alto'},
    {value: 'high', text: 'Ordenar por precio: alto a bajo'}
  ]

  const [actualSortOption, setActualSortOption] = useState(options[0].value)
  const [database, setDatabase] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const filteredDatabase = () => {
    return database.slice(currentPage, currentPage + 12)
  }

  const handleClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 12)
    }
  }

  const handleClickNext = () => {
    if (currentPage + 12 < database.length) {
      setCurrentPage(currentPage + 12)
    }
  }

  const handleChangeSelectbox = (event) => {
    setActualSortOption(event.target.value)
    setCurrentPage(0)
  }

  useEffect(()=>{
    const copyData = [...data]

    switch (actualSortOption) {
      case 'default':
        break;
      case 'low':
        copyData.sort((x, y) => x.price - y.price)
        break;
      case 'high':
        copyData.sort((x, y) => x.price - y.price).reverse()
        break;
    }

    setDatabase(copyData)

  },[actualSortOption])

  const handlePrevButtonClass = currentPage == 0 ? 'page-button disabled' : 'page-button'
  const handleNextButtonClass = currentPage + 12 > database.length ? 'page-button disabled' : 'page-button'
  
  const showingFrom = currentPage + 1
  const showingTo = currentPage + 12 > database.length ? database.length : currentPage + 12

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

  const { menuState, setMenuState } = useContext(MenuStatusContext)

  const handleMenuStatus = () => {
    if (menuState === true) {
      setMenuState(false)
    }
  }

  return (
    <div className='ShopPage' onClick={handleMenuStatus}>
      <Navbar />
      <HeaderShop title={'Tienda'} />
      <main className='main-shop'>
        <div className='main-shop-selectbox-container'>
          <p className='results-show-adviser'>Mostrando {showingFrom}-{showingTo} de {database.length} resultados</p>
          <select value={actualSortOption} className='main-shop-selectbox-form' onChange={handleChangeSelectbox} >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className='main-shop-products-container'>
          {filteredDatabase().map(product => {
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
        <div className='main-shop-page-container'>
          <button className={handlePrevButtonClass} onClick={handleClickPrev}>
            <img src={leftArrow} className='page-button-icon' />
          </button>
          <button className={handleNextButtonClass} onClick={handleClickNext}>
            <img src={rightArrow} className='page-button-icon' />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ShopPage;