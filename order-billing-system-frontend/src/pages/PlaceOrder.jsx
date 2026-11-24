import { useEffect, useState } from "react";
import axios from "axios";

function PlaceOrder() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.get(
      "http://localhost:8080/customers",
      { headers }
    )
    .then(res =>
      setCustomers(res.data));

    axios.get(
      "http://localhost:8080/products",
      { headers }
    )
    .then(res =>
      setProducts(res.data));

  }, []);

  const placeOrder = async () => {

    const token =
      localStorage.getItem("token");

    await axios.post(
      "http://localhost:8080/orders/place-order",
      {
        customerId,
        items: [
          {
            productId,
            quantity
          }
        ]
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert("Order Placed");
  };

  return (

    <div className="page-container">

      <h2>Place Order</h2>

      <div className="form-card">

        <select
          onChange={(e) =>
            setCustomerId(
              e.target.value)}
        >

          <option>
            Select Customer
          </option>

          {customers.map(customer => (

            <option
              key={customer.customerId}
              value={
                customer.customerId
              }
            >
              {customer.name}
            </option>

          ))}

        </select>

        <select
          onChange={(e) =>
            setProductId(
              e.target.value)}
        >

          <option>
            Select Product
          </option>

          {products.map(product => (

            <option
              key={product.productId}
              value={
                product.productId
              }
            >
              {product.name}
            </option>

          ))}

        </select>

        <input
          placeholder="Quantity"
          onChange={(e) =>
            setQuantity(
              e.target.value)}
        />

        <button
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>

  );
}

export default PlaceOrder;