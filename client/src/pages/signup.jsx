import { useState } from "react";
import { requestSignUp } from "../api/authentication";

function SignUp() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  });

  async function handleSignUp(e) {
    e.preventDefault();
    // Reset message
    setMessage();

    // Verify if a field is empty in the form
    const formIsComplete = Object.values(user).every((value) => value !== "");
    if (!formIsComplete) return setMessage("Please complete the form");

    const request = await requestSignUp({ ...user });
    console.log(request);
  }

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      <h3>Sign Up</h3>

      {message}

      <div>
        <label>First name</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        />

        <label>Last name</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        />
      </div>

      <label>E-mail</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label>Password</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <label>Password confirmation</label>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, confirm: e.target.value })}
      />

      <button>Submit</button>
    </form>
  );
}

export default SignUp;
