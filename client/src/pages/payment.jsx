import Total from "../components/payment/total.jsx";
import { useCartContext } from "../context/cart/index.js";
import Address from "../components/payment/addressInfo.jsx";
import ProductsInPayment from "../components/payment/productsInPayment.jsx";
import CardInfo from "../components/payment/cardInfo.jsx";

function Payment() {
  const { cartProducts } = useCartContext();

  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-xl">Cart</h3>

          {cartProducts?.map((product) => {
            return <ProductsInPayment key={product.id} {...product} />;
          })}
        </div>

        <Total />

       
        {cartProducts.reduce((total, product) => total + product.price * product.quantity, 0) >= 150 && <div>Ajouter un papier cadeau</div>}
      </div>

      <Address />
      <CardInfo />

      <button className="border rounded-md px-12 py-2 w-fit">Pay</button>
    </div>
  );
}

export default Payment;
