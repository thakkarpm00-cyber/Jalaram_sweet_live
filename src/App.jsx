import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import About from "./Pages/About";
import Home from "./Pages/Home";
import { OurProducts } from "./Pages/OurProducts";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import ContactAdmin from "./Pages/ContactAdmin";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin route - password protected on frontend */}
        <Route path="/admin/contacts" element={<ContactAdmin />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
