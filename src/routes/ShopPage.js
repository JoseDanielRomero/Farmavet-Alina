import HeaderShop from '../components/HeaderShop';
import Navbar from '../components/Navbar';
import '../stylesheets/ShopPage.css'

function ShopPage() {
  return (
    <div className='ShopPage'>
      <Navbar />
      <HeaderShop title={'Tienda'} />
    </div>
  )
}

export default ShopPage;