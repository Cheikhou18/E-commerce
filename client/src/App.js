import "./index.css";
import Router from "./router";

import CartProvider from "./context/cart";
import { AuthProvider } from "./context/admin";
import Cart from "./components/cart";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />

        <Cart />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
