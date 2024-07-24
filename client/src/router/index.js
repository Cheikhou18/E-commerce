import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Product from "../pages/product";
import Breadcrumbs from "../components/breadcrumbs";

function Router() {
  return (
    <BrowserRouter>
      <Breadcrumbs />

      <Routes>
        {<Route path="/" element={<Home />} />}
        {/* <Route path="" element={} /> */}
        <Route path="/products/:id" element={<Product />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
