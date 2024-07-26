import { Link } from "react-router-dom";
import "../assets/css/Products.css";

function Navbar(){
    return(
       <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>All glasses</Link>
            <Link to={"/signin"}>Sign in</Link>
            <Link to={"/signup"}>Sign up</Link>
            <Link to={"/admin"}>Admin</Link>

        </div>

        
    );
}
export default Navbar;