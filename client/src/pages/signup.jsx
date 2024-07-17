import { useState } from "react";

function SignUp() {
  const [message, setMessage] = useState();
  const [user, setUser] = useState();

  function handleSignUp(e) {
    e.preventDefault();

    setMessage("Bonjour");
  }

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      <h3>Sign Up</h3>

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
