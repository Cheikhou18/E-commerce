import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, getSimilarProductsByName } from "../api/products";
import { useCartContext } from "../context/cart";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { increaseProductQuantity, decreaseProductQuantity } = useCartContext();

  useEffect(() => {
    async function fetchDetails() {
      const request = await getProductById(id);
      if (request.success) setProduct(request.response);
    }

    fetchDetails();
  }, [id]);

  if (product) {
    return (
      <div className="flex justify-center p-6 md:p-12">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6 md:w-screen md:justify-evenly">
          <img
            src={product.image}
            alt={product.name}
            className="w-44 md:w-[32vw]"
          />

          <div className="flex flex-col gap-1 sm:gap-3 w-[50vw]">
            <h2 className="text-xl capitalize">{product.name}</h2>
            <h1 className="text-2xl md:text-4xl font-bold">
              {product.price} €
            </h1>

            {product?.similar_products && (
              <div className="flex flex-col gap-2">
                {product.similar_products.map((similarProduct) => {
                  return (
                    <Link
                      to={`/products/${similarProduct.id}`}
                      key={similarProduct.id}
                      className="flex border px-4 py-2 rounded-md w-fit"
                    >
                      <h4 className="capitalize">{similarProduct.color}</h4>
                    </Link>
                  );
                })}
              </div>
            )}

            <button
              className="rounded-md px-4 py-2 bg-green-400"
              onClick={() => increaseProductQuantity(product.id)}
            >
              Add to cart
            </button>

            <p className="border rounded-md px-6 py-3">{product.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
