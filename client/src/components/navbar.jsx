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
      <button onClick={() => changeViewCart()}>Cart</button>
      {cartQuantity > 0 && <span>{cartQuantity}</span>}
    </div>
  );
}
export default Navbar;
