import { useState } from "react";
import { requestSignIn } from "../api/Authentication";

function SignIn() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();

    user.foreach((data) => {
      if (data === "") {
        return setMessage("Please complete the form.");
      }
    });

    if (user.password !== user.confirm) {
      return setMessage("Passwords must match.");
    }

    const request = await requestSignIn();

    console.log(request);
  }

  return (
    <form onSubmit={(e) => handleSignIn(e)}>
      <h3>Sign In</h3>

      <div>
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
      </div>

      <button>Submit</button>
    </form>
  );
}

export default SignIn;
