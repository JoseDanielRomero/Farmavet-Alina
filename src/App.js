import data from './data.json';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './routes/Homepage';
import ShopPage from './routes/ShopPage';
import ProductPage from './routes/ProductPage';
import ShopCategoryPage from './routes/ShopCategoryPage';

function App() {
  return (
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
          <Route path='/cuidado-animal' element={<ShopCategoryPage category={'cuidado'} />} />
          <Route path='/producto/:productId' element={<ProductPage />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
