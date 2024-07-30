import { deleteCategory } from "../api/categories";

function CategoryCard({ props }) {
  const { category, setMessage, setCategories, fetchCategories } = props;

  async function handleDelete() {
    const request = await deleteCategory(category.id);

    if (request.success) {
      setCategories((currCategories) => {
        return currCategories.filter(
          (currCategory) => currCategory.id !== category.id
        );
      });
    }

    if (setMessage !== null) {
      setMessage("categories", request.message);
    }

    fetchCategories();
  }

  return (
    <div>
      <p>{category.name}</p>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}

export default CategoryCard;
