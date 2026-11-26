import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "https://order-billing-system.onrender.com/orders",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setOrders(response.data);
    };

    fetchOrders();

  }, []);

  return (

  <div className="page-container">

    <h2>Orders</h2>

    <table className="data-table">

      <thead>

        <tr>

          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Customer</th>

        </tr>

      </thead>

      <tbody>

        {orders.map(order => (

          <tr key={order.orderId}>

            <td>{order.orderId}</td>

            <td>{order.orderDate}</td>

            <td>{order.status}</td>

            <td>
              {order.customer?.name}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

);

}

export default Orders;