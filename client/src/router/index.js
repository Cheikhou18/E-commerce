import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Product from "../pages/product";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="" element={} /> */}
        {/* <Route path="" element={} /> */}
        <Route path="/products/:id" element={<Product />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
