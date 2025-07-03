import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import RouteShimmer from './components/RouteShimmer';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Product = lazy(() => import('./pages/Product'));
const CategoryPage = lazy(() => import('./pages/CategoriesPage'));
const Cart = lazy(() => import('./Cart Pages/Cart'));
const Shipping = lazy(() => import('./Cart Pages/Shipping'));
const Payment = lazy(() => import('./Cart Pages/payment'));
const Confirmation = lazy(() => import('./Cart Pages/Confirmation'));
const WishlistPage = lazy(() => import('./pages/Wishlist'));

const App = () => {
  return (
    <>
      <Header />
      <div className="bg-light">
        <Suspense fallback={<RouteShimmer />}>
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
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
