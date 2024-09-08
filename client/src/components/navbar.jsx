import "../assets/css/Products.css";

import { Link } from "react-router-dom";
import { useAuth } from "../context/admin.js";
import { useCartContext } from "../context/cart";

function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { changeViewCart, cartQuantity } = useCartContext();

  return (
    <nav className="navbar flex flex-col md:flex-row items-center justify-between px-12 py-6 gap-4 top-0 md:sticky z-50">
      <Link to={"/"}>Home</Link>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <Link to={"/products"}>All products</Link>

        {isAdmin && <Link to={"/admin"}>Admin</Link>}

        <button onClick={() => changeViewCart()}>
          <span className="text-black">Cart</span>
          {cartQuantity > 0 && (
            <span className="flex absolute text-xs translate-x-5 -translate-y-2 rounded-xl px-2 py-1 bg-red-600">
              {cartQuantity}
            </span>
          )}
        </button>

        {user ? (
          <button
            className="px-4 py-2 bg-black text-white rounded-lg w-full"
            onClick={logout}
          >
            Log out
          </button>
        ) : (
          <>
            <Link to={"/signin"}>
              <button className="px-4 py-2 bg-white rounded-lg w-full">
                Sign in
              </button>
            </Link>

            <Link to={"/signup"}>
              <button className="px-4 py-2 bg-black text-white rounded-lg w-full">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
