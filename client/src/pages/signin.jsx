import { useState } from "react";
import { requestSignIn } from "../api/authentication";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 6e51512951253f59d1a8600ddee16bf4f01af8dc

function SignIn() {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();
    // Reset message
    setMessage();

    // Verify if the form is complete
    const formIsComplete = Object.values(user).every((value) => value !== "");
    if (!formIsComplete) return setMessage("Please complete the form");

    const request = await requestSignIn({ ...user });

    if (!request.success) {
      return setMessage(request.message);
    }

    localStorage.setItem("id", request.id);
    navigate("/");
  }

  return (
    <form onSubmit={(e) => handleSignIn(e)}>
      <h3>Sign In</h3>

      <div>
        <label>E-mail</label>
        <input
          type="text"
          placeholder="example@email.com"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="********"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      {message}

      <button>Submit</button>
    </form>
  );
}

export default SignIn;
