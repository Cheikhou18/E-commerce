import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCartContext } from "../context/cart";
import Navbar from "../components/navbar";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { increaseProductQuantity } = useCartContext();

  useEffect(() => {
    async function fetchDetails() {
      const request = await getProductById(id);
      if (request.success) setProduct(request.response);
    }

    fetchDetails();
  }, [id]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {/* If product, display product details else display error */}
      {product ? (
        <div className="flex flex-col gap-12">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>Description : {product.description}</p>

          <div className="flex gap-6">
            <div>
              <p>{product.price} €</p>
            </div>
            <div>
              <p>In stock: {product.stock}</p>
            </div>
          </div>

          <button
            onClick={() => increaseProductQuantity(product.id)}
            className="px-4 py-2 bg-green-400 hover:bg-green-800 rounded-xl"
          >
            Add to cart
          </button>
        </div>
      ) : (
        <p>
          It seems this product does not exist. Go back to{" "}
          <Link className="underline hover:text-green-500" to="/">
            Home
          </Link>
        </p>
      )}
    </div>
  );
}

export default ProductDetails;
