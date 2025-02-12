import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Admin from "../pages/admin";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Profile from "../pages/profile";
import Payment from "../pages/payment";
import ProductDetails from "../pages/product";
import ProductList from "../pages/productList";
import BeforePayment from "../pages/beforePayment";

import Navbar from "../components/navbar";
import Cart from "../components/cart/cart";
import Breadcrumbs from "../components/breadcrumbs";
import Footer from "../components/footer";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumbs />
      <Cart />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Payment />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/verification" element={<BeforePayment />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default Router;
