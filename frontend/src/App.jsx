import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import StoreLayout from './components/layouts/StoreLayout';
import Home from './pages/store/Home';
import Menu from './pages/store/Menu';
import ProductDetails from './pages/store/ProductDetails';
import Cart from './pages/store/Cart';
import Contact from './pages/store/Contact';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="category/:categoryId" element={<Menu />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
