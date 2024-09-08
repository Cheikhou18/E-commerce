import { useState } from "react";
import { requestSignIn } from "../api/auth/authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin";

function SignIn() {
  const navigate = useNavigate();
  const { setUser, setIsAdmin } = useAuth();

  const [message, setMessage] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();
    // Reset message
    setMessage();

    // Verify if the form is complete
    const formIsComplete = Object.values(data).every((value) => value !== "");
    if (!formIsComplete) return setMessage("Please complete the form");

    const request = await requestSignIn({ ...data });

    if (!request.success) {
      return setMessage(request.message);
    }

    localStorage.setItem("id", request.response.id);
    setUser(request.response);
    setIsAdmin(request.response?.roles?.includes("ROLE_ADMIN"));

    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <form className="flex flex-col gap-6" onSubmit={(e) => handleSignIn(e)}>
        <h3 className="text-xl">Sign In</h3>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="text"
            placeholder="example@email.com"
            className="border px-4 py-2"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        {message}

        <button className="border px-8 py-2">Submit</button>
      </form>
    </div>
  );
}

export default SignIn;
