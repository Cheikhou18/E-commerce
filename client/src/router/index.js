import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route path="" element={<Home/>} /> }
        {/* <Route path="" element={} /> */}
        {/* <Route path="" element={} /> */}
        {/* <Route path="" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
