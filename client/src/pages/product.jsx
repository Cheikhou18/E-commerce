import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, getSimilarProductsByName } from "../api/products";
import { useCartContext } from "../context/cart";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const { increaseProductQuantity } = useCartContext();

  useEffect(() => {
    async function fetchDetails() {
      const request = await getProductById(id);
      if (request.success) {
        setProduct(request.response);

        const similarRequest = await getSimilarProductsByName(request.response.name, id);
        if (similarRequest.success) {
          setSimilarProducts(similarRequest.response);
        }
      }
    }

    fetchDetails();
  }, [id]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {product ? (
        <div className="flex flex-col gap-12">
          <img src={product.image} alt={product.name} className="w-96" />

          <h2 className="text-xl font-bold">{product.name}</h2>
          <img src={product.image} alt={product.name} className="max-h-96" />
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

          <div>
            <h3 className="text-lg font-bold">Other Colors</h3>
            <div className="flex flex-row gap-4 ">
              {similarProducts.map((similarProduct) => (
                <Link
                  to={`/products/${similarProduct.id}`}
                  key={similarProduct.id}
                  className="flex flex-col items-center border p-4 rounded-lg "
                >
                  <h4>{similarProduct.name} ({similarProduct.color})</h4>
                  <img 
                    src={similarProduct.image} 
                    alt={similarProduct.name} 
                    className="cursor-pointer h-20"
                  />
                  <p>{similarProduct.price} €</p>
                </Link>
              ))}
            </div>
          </div>
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
