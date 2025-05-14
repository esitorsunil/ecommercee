// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Collection from '../pages/Collection';
import About from '../pages/About';
import Contact from '../pages/Contact';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/collection" element={<Collection />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
);

export default AppRoutes;
