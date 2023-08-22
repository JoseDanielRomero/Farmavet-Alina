import '../stylesheets/ProductCard.css'

function ProductCard({ imageId }) {

  return (
    <article className='product-card-container'>
      <section className='product-card-image-box'>
        <img src={require(`../images/products/${imageId}.png`)} className='product-card-image' />
      </section>
      <section className='product-card-text-box'>
        <h4 className='product-card-name'>Allmectin de 100 ml</h4>
        <h5 className='product-card-price'>$7.00</h5>
      </section>
    </article>
  )
}

export default ProductCard;