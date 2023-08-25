import data from './data.json';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './routes/Homepage';
import ShopPage from './routes/ShopPage';
import ProductPage from './routes/ProductPage';
import ShopCategoryPage from './routes/ShopCategoryPage';
import { createContext, useState } from 'react';

export const CartContext = createContext([])

function App() {

  const cartList = JSON.parse(localStorage.getItem('cart')) || []
  const [cartState, setCartState] = useState(cartList)

  return (
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
        </Routes>
      </HashRouter>
    </CartContext.Provider>
  );
}

export default App;
