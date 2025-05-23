import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import Product from './pages/Product';
import CategoryPage from './pages/CategoriesPage';
import Cart from './Cart Pages/Cart';
import Shipping from './Cart Pages/Shipping';
import Payment from './Cart Pages/payment';
import Confirmation from './Cart Pages/Confirmation';
import WishlistPage from './pages/Wishlist';

const App = () => {
  return (
    <>
      <Header />
      <div className='bg-light'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/shipping" element={<Shipping />} />
           <Route path='/payment' element={<Payment />} />
           <Route path='/confirmation' element={<Confirmation />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<WishlistPage />} />
           <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
    </div>
    </>
  );
};

export default App;
