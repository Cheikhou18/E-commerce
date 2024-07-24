import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Product from "../pages/product";
import ProductDetails from "../pages/admin";
import Breadcrumbs from "../components/breadcrumbs";

function Router() {
  return (
    <BrowserRouter>
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
