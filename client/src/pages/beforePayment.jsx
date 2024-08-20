import { useEffect } from "react";
import { useAuth } from "../context/admin";
import { Link, useNavigate } from "react-router-dom";

function BeforePayment() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) navigate("/cart");
  }, [user]);

  return (
    <>
      <h3>Before proceeding to cart</h3>

      <Link to="/signin">Log in</Link>
      <Link to="/cart">Continue without an account</Link>
    </>
  );
}

export default BeforePayment;
