import "./index.css";
import Router from "./router";

import CartProvider from "./context/cart";
import { AuthProvider } from "./context/admin";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
