import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Admin from "../pages/admin";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Profile from "../pages/profile";
import Navbar from "../components/navbar";
import ProductDetails from "../pages/product";
import ProductList from "../pages/productList";
import Breadcrumbs from "../components/breadcrumbs";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
