import { useState } from "react";
import { createCategory } from "../../api/auth/admin";
import { getCategories } from "../../api/categories";

function AddCategory({ props }) {
  const [message, setMessage] = useState();
  const [visibility, setVisibility] = useState();
  const [category, setCategory] = useState({ name: "" });

  function displayMessage(mess) {
    setMessage(mess);

    // Clears the message after 2 seconds
    return setTimeout(() => setMessage(), 2 * 1000);
  }

  async function handleCategoryForm(e) {
    e.preventDefault();

    if (category.name === "") return displayMessage("Please insert a name");

    const request = await createCategory(category);
    if (request.success) {
      const { setCategories } = props;
      if (setCategories !== null) {
        const fetchCategories = await getCategories();
        if (fetchCategories.success) setCategories(fetchCategories.categories);
      }
    }

    displayMessage(request.message);
  }

  return (
    <>
      {visibility ? (
        <form
          className="flex flex-col absolute top-1/2 gap-2 bg-gray-600 rounded-xl p-10"
          onSubmit={(e) => handleCategoryForm(e)}
        >
          <label>Category name</label>

          <input
            type="text"
            placeholder="Name..."
            className="px-4 py-2"
            onChange={(e) => setCategory({ name: e.target.value })}
          />

          <span className="text-sm">{message}</span>

          <button className="border rounded-md px-4 py-2">Add</button>
        </form>
      ) : null}
      <button onClick={() => setVisibility(!visibility)}>
        + Add a category
      </button>
    </>
  );
}

export default AddCategory;
