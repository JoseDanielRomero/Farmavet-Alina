import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './routes/Homepage';
import ShopPage from './routes/ShopPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/tienda' element={<ShopPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
