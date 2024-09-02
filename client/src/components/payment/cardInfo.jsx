import { useEffect, useState } from "react";
import { updateAccount } from "../../api/user";
import { useAuth } from "../../context/admin";

function CardInfo({ props }) {
  const { user } = useAuth();
  const [message, setMessage] = useState();
  const { userInfo, setUserInfo } = props;

  useEffect(() => {
    setUserInfo({ ...userInfo, card: { ...user?.card } });
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSubmit();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [userInfo?.cardInfo]);

  async function handleSubmit() {
    const formIsComplete = Object.values(userInfo?.card).every(
      (value) => value !== ("" || undefined)
    );

    if (!formIsComplete)
      return setMessage("Please enter your card informations");

    console.log({ ...user, card: userInfo?.card });
    await updateAccount(user?.id, { ...user, card: [userInfo?.card] });
  }

  function handleChange(e) {
    setUserInfo((previous) => {
      return {
        ...previous,
        card: { ...previous.card, [e.target.name]: e.target.value },
      };
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Card info</h3>

      {message}

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label>Card number</label>
          <input
            type="text"
            name="number"
            defaultValue={user?.card?.number}
            onChange={(e) => handleChange(e)}
            placeholder="1234 5678 9012 3456"
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Cardholder name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.card?.name}
            onChange={(e) => handleChange(e)}
            placeholder="Cardholder Name"
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Expiration date</label>
          <input
            type="month"
            name="date"
            defaultValue={user?.card?.date}
            onChange={(e) => handleChange(e)}
            className="border p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            defaultValue={user?.card?.cvv}
            onChange={(e) => handleChange(e)}
            className="border p-2"
          />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
