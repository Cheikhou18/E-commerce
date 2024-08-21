import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignUp } from "../api/auth/authentication";

function SignUp() {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  async function handleSignUp(e) {
    e.preventDefault();
    // Reset message
    setMessage();

    // Verify if the form is complete
    const formIsComplete = Object.values(user).every((value) => value !== "");
    if (!formIsComplete) return setMessage("Please complete the form");

    if (user.password !== user.confirm)
      return setMessage("Passwords do not match");

    const request = await requestSignUp({ ...user });

    if (!request.success) {
      return setMessage(request.message);
    }

    localStorage.setItem("id", request.id);
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <form className="flex flex-col gap-6" onSubmit={(e) => handleSignUp(e)}>
        <h3 className="text-xl">Sign Up</h3>

        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="text"
            placeholder="example@email.com"
            className="border px-4 py-2"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2"
            onChange={(e) => setUser({ ...user, confirm: e.target.value })}
          />
        </div>

        {message}

        <button className="border px-8 py-2">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
