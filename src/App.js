import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './routes/Homepage';
import ShopPage from './routes/ShopPage';
import ProductPage from './routes/ProductPage';
import ShopCategoryPage from './routes/ShopCategoryPage';
import { createContext, useState } from 'react';
import CartPage from './routes/CartPage';
import CheckoutPage from './routes/CheckoutPage';
import PaymentConfirmation from './routes/PaymentConfirmation';
import BrandsPage from './routes/BrandsPage';

export const CartContext = createContext([])
export const TempCheckoutContext = createContext(false)
export const OrderConfirmedContext = createContext(false)

function App() {

  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const [cartState, setCartState] = useState([...cartList])
  const [tempCheckout, setTempCheckout] = useState(false)
  const [orderConfirmation, setOrderConfirmation] = useState(false)

  return (
    <OrderConfirmedContext.Provider value={{ orderConfirmation, setOrderConfirmation }}>
      <TempCheckoutContext.Provider value={{ tempCheckout, setTempCheckout }}>
        <CartContext.Provider value={{ cartState, setCartState }}>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/tienda' element={<ShopPage />} />
              <Route path='/desparasitantes' element={<ShopCategoryPage category={'desparasitantes'} />} />
              <Route path='/antibioticos' element={<ShopCategoryPage category={'antibiotico'} />} />
              <Route path='/vitaminas' element={<ShopCategoryPage category={'vitaminas'} />} />
              <Route path='/antiinflamatorio' element={<ShopCategoryPage category={'antiinflamatorio'} />} />
              <Route path='/vacunas' element={<ShopCategoryPage category={'vacuna'} />} />
              <Route path='/alimentacion' element={<ShopCategoryPage category={'alimentacion'} />} />
              <Route path='/cuidado-animal' element={<ShopCategoryPage category={'cuidado animal'} />} />
              <Route path='/producto/:productId' element={<ProductPage />} />
              <Route path='/carrito' element={<CartPage />} />
              <Route path='/check-out' element={<CheckoutPage />} />
              <Route path='/confirmacion' element={<PaymentConfirmation />} />
              <Route path='/marcas' element={<BrandsPage />} />
            </Routes>
          </HashRouter>
        </CartContext.Provider>
      </TempCheckoutContext.Provider>
    </OrderConfirmedContext.Provider>
  );
}

export default App;
