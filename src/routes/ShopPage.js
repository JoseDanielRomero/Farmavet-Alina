import { useState } from 'react';
import HeaderShop from '../components/HeaderShop';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../stylesheets/ShopPage.css'

function ShopPage() {

  const options = [
    {value: 'default', text: 'Orden por defecto'},
    {value: 'low', text: 'Ordenar por precio: bajo a alto'},
    {value: 'high', text: 'Ordenar por precio: alto a bajo'}
  ]
  const [actualSortOption, setActualSortOption] = useState(options[0].value)

  const handleChangeSelectbox = (event) => {
    setActualSortOption(event.target.value)
  }

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
          <ProductCard imageId={'1001'} />
        </div>
      </main>
    </div>
  )
}

export default ShopPage;