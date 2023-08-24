import data from '../data.json';
import { useEffect, useState } from 'react';
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

function ShopPage() {

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

  return (
    <div className='ShopPage'>
      <Navbar />
      <HeaderShop title={'Tienda'} />
      <main className='main-shop'>
        <div className='main-shop-selectbox-container'>
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
                <button className='product-card-button' >
                  <img src={cartIcon} className='product-card-cart-icon' />
                  <img src={plusIcon} className='product-card-plus-icon' />
                </button>
              </div>
              
          )})}
        </div>
        <div className='main-shop-page-container'>
          <button className='page-button' onClick={handleClickPrev}>
            <img src={leftArrow} className='page-button-icon' />
          </button>
          <button className='page-button' onClick={handleClickNext}>
            <img src={rightArrow} className='page-button-icon' />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ShopPage;