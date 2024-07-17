import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="" element={} /> */}
        {/* <Route path="" element={} /> */}
        {/* <Route path="" element={} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
