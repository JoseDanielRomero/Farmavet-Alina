import '../stylesheets/ProductCard.css'


function ProductCard({ imageId, name, price }) {

  return (
    <article className='product-card-container'>
      <section className='product-card-image-box'>
        <img src={require(`../images/products/${imageId}.png`)} className='product-card-image' />
      </section>
      <section className='product-card-text-box'>
        <h4 className='product-card-name'>{name}</h4>
        <div className='product-card-lower-box'>
          <h5 className='product-card-price'>${price}</h5>
        </div>
      </section>
    </article>
  )
}

export default ProductCard;