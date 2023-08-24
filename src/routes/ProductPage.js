import data from '../data.json';
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../stylesheets/ProductPage.css'
import { useState } from 'react';
import cartIcon from '../images/shopping-cart-2.png'
import plusIcon from '../images/plus.png'

function ProductPage() {

  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)

  const formatProductId = Number(productId)
  const findIdx = data.findIndex(element => element.id === formatProductId)
  const actualProduct = data[findIdx]

  const firstLetter = actualProduct.category.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = actualProduct.category.slice(1)
  const capitalizedWord = firstLetterCap + remainingLetters

  const handleChangeInput = (event) => {
    setQuantity(event.target.value)
  }

  const handleSubmitButton = (event) => {
    event.preventDefault()
  }

  return (
    <div className='ProductPage'>
      <Navbar />
      <main className='main-product-page-container'>
        <article className='main-product-page-image-box'>
          <img src={require(`../images/products/${productId}.png`)} className='main-product-page-image' />
        </article>
        <article className='main-product-page-info-container'>
          <h1 className='main-product-page-title'>{actualProduct.name}</h1>
          <h3 className='main-product-page-price'>$ {actualProduct.price}</h3>
          <form className='main-product-page-button-box' onSubmit={handleSubmitButton} >
            <input type='number' className='product-page-quantity-input' onChange={handleChangeInput} value={quantity} min='1' max='5' />
            <button type='submit' className='product-page-add-button' >
              <img src={cartIcon} className='product-page-cart-icon' />
              <img src={plusIcon} className='product-page-plus-icon' />
              <p className='product-page-text-button'>Añadir al carrito</p>
            </button>
          </form>
          <section className='main-product-page-details-box'>
          <div className='detail-line'>
              <p className='detail-title'>Descripción: </p>
              <p className='detail-answer'>{actualProduct.description}</p>
            </div>
            <div className='detail-line'>
              <p className='detail-title'>Categoría: </p>
              <p className='detail-answer'>{capitalizedWord}</p>
            </div>
            <div className='detail-line'>
              <p className='detail-title'>SKU: </p>
              <p className='detail-answer'>{actualProduct.id}</p>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}

export default ProductPage