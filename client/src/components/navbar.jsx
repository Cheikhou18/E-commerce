import { Link } from "react-router-dom";
import "../assets/css/Products.css";
import { useCartContext } from "../context/cart";

function Navbar() {
  const { changeViewCart, cartQuantity } = useCartContext();

  return (
    <nav className="navbar flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row items-center flex-grow justify-between">
        <Link className="mb-4 md:mb-0" to={"/"}>
          Home
        </Link>
        
        <Link className="mb-4 md:mb-0 md:ml-6" to={"/products"}>
          All glasses
        </Link>
        <Link className="mb-4 md:mb-0 md:ml-6" to={"/admin"}>
          Admin
        </Link>
        
        <Link className="mb-4 md:mb-0 md:ml-6" to={"/"}>
          <button className="px-4 py-2 bg-white rounded-lg w-full">
            Sign in
          </button>
        </Link>
        <Link className="mb-4 md:mb-0 md:ml-6" to={"/signup"}>
          <button className="px-4 py-2 bg-black text-white rounded-lg w-full">
            Register
          </button>
        </Link>

        <button
          className="relative mb-4 md:mb-0 md:ml-6 text-white"
          onClick={() => changeViewCart()}
        >
          <span className="text-black">Cart</span>
          {cartQuantity > 0 && (
            <span className="flex absolute text-xs translate-x-5 -translate-y-2 rounded-xl px-2 py-1 bg-red-600">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
