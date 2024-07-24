import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";

function ProductDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchDetails() {
      const request = await getProductById(id);

      if (request.success) {
        setProducts(await getProductById(id));
      }
    }

    fetchDetails();
  }, []);

  console.log(products);
}

export default ProductDetails;
