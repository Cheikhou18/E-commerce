import { useState } from "react";
import { requestSignIn } from "../api/authentication";

function SignIn() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();

    const request = await requestSignIn({ ...user });
    console.log(request);
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

        <label>Password</label>
        <input
          type="text"
          placeholder="********"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      <button>Submit</button>
    </form>
  );
}

export default SignIn;
