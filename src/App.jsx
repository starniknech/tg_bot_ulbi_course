import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div>
      <Header />
      <Routes>
        <Route index path='/' element={<ProductList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
