import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);

  const [paidInvoices, setPaidInvoices] =
    useState(0);

  const [pendingInvoices, setPendingInvoices] =
    useState(0);

  const [revenue, setRevenue] =
    useState(0);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const headers = {
      Authorization:
        `Bearer ${token}`
    };

    axios.get(
      "https://order-billing-system.onrender.com/products",
      { headers }
    )
    .then(res =>
      setProducts(res.data.length));

    axios.get(
      "https://order-billing-system.onrender.com/customers",
      { headers }
    )
    .then(res =>
      setCustomers(res.data.length));

    axios.get(
      "https://order-billing-system.onrender.com/orders",
      { headers }
    )
    .then(res =>
      setOrders(res.data.length));

    axios.get(
      "https://order-billing-system.onrender.com/invoices",
      { headers }
    )
    .then(res => {

      const invoices =
        res.data;

      const paid =
        invoices.filter(
          invoice =>
            invoice.paymentStatus ===
            "PAID"
        );

      const pending =
        invoices.filter(
          invoice =>
            invoice.paymentStatus ===
            "PENDING"
        );

      const totalRevenue =
        paid.reduce(
          (sum, invoice) =>
            sum + invoice.totalAmount,
          0
        );

      setPaidInvoices(
        paid.length
      );

      setPendingInvoices(
        pending.length
      );

      setRevenue(
        totalRevenue
      );

    });

  }, []);

  return (

    <div>

      <h1>
        Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{products}</h2>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <h2>{customers}</h2>
          <p>Total Customers</p>
        </div>

        <div className="stat-card">
          <h2>{orders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>₹{revenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div className="stat-card">
          <h2>{paidInvoices}</h2>
          <p>Paid Invoices</p>
        </div>

        <div className="stat-card">
          <h2>{pendingInvoices}</h2>
          <p>Pending Invoices</p>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;