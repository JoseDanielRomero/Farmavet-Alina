import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './routes/Homepage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
