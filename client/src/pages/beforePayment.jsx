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
    <div className="flex flex-col gap-4 items-center border">
      <h3>Before proceeding to cart</h3>

      <Link to="/signin">Connect to your account</Link>
      <Link to="/cart">Continue without as a Guest</Link>
    </div>
  );
}

export default BeforePayment;
