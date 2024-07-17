import { useState } from "react";

function SignIn() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState();

  function handleSignIn(e) {
    e.preventDefault();

    setMessage("Bonjour");
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
