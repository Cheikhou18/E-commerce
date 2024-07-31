import { Link } from "react-router-dom";
import "../assets/css/Products.css";
import { useCartContext } from "../context/cart";

function Navbar() {
  const { changeViewCart, cartQuantity } = useCartContext();

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/products"}>All glasses</Link>
      <Link to={"/signin"}>Sign in</Link>
      <Link to={"/signup"}>Sign up</Link>
      <Link to={"/admin"}>Admin</Link>
      <button className="text-white" onClick={() => changeViewCart()}>
        Cart
        {cartQuantity > 0 && (
          <span className="flex absolute text-xs translate-x-6 -translate-y-2 rounded-xl px-2 py-1 bg-red-600">
            {cartQuantity}
          </span>
        )}
      </button>
    </div>
  );
}
export default Navbar;
