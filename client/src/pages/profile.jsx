import { useEffect, useState } from "react";
import { useAuth } from "../context/admin";
import { updateAccount } from "../api/user";

function Profile() {
  const { user } = useAuth();
  const [update, setUpdate] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (user?.id !== undefined) setUpdate(user);
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const request = await updateAccount(user.id, update);

    setMessage(request.message);
    setTimeout(() => setMessage(), 2000);
  }

  if (user) {
    return (
      <form
        className="flex justify-center items-center h-screen"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <h1>Profile</h1>

          <input
            type="text"
            placeholder="First name"
            defaultValue={user?.firstname}
            className="border px-2 py-1 rounded-sm"
            onChange={(e) =>
              setUpdate({ ...update, firstname: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Last name"
            defaultValue={user?.lastname}
            className="border px-2 py-1 rounded-sm"
            onChange={(e) => setUpdate({ ...update, lastname: e.target.value })}
          />

          <input
            type="text"
            placeholder="example@email.com"
            defaultValue={user?.email}
            className="border px-2 py-1 rounded-sm"
            onChange={(e) => setUpdate({ ...update, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="*********"
            className="border px-2 py-1 rounded-sm"
            onChange={(e) => setUpdate({ ...update, password: e.target.value })}
          />

          {message}

          <button className="border px-2 py-1 rounded-sm">Save</button>
        </div>
      </form>
    );
  }
}

export default Profile;
