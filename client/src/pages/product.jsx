import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/productsDetails";

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState();
  
  useEffect(() => {
    async function fetchDetails() {
        setProducts(await getProductDetails());
    }

    fetchDetails();
  }, [])

  console.log(id);
}

export default Product;
