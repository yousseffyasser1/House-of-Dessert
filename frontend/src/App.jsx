import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import StoreLayout from './components/layouts/StoreLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Home from './pages/store/Home';
import Menu from './pages/store/Menu';
import ProductDetails from './pages/store/ProductDetails';
import Cart from './pages/store/Cart';
import Checkout from './pages/store/Checkout';
import Contact from './pages/store/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCalendar from './pages/admin/AdminCalendar';

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
            <Route path="checkout" element={<Checkout />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="calendar" element={<AdminCalendar />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
