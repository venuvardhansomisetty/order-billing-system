import { useEffect, useState } from "react";
import axios from "axios";

function Invoices() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {

    fetchInvoices();

  }, []);

  const fetchInvoices = async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(

      "http://localhost:8080/invoices",

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );

    setInvoices(response.data);

  };

  const markAsPaid = async (id) => {

    const token =
      localStorage.getItem("token");

    await axios.put(

      `http://localhost:8080/invoices/${id}/status/PAID`,

      {},

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );

    fetchInvoices();

  };

  return (

    <div className="page-container">

      <h2>Invoices</h2>

      <table className="data-table">

        <thead>

          <tr>

            <th>Invoice ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Order ID</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {invoices.map(invoice => (

            <tr
              key={invoice.invoiceId}
            >

              <td>
                {invoice.invoiceId}
              </td>

              <td>
                ₹{invoice.totalAmount}
              </td>

              <td>

                {invoice.paymentStatus}

              </td>

              <td>

                {invoice.order?.orderId}

              </td>

              <td>

                {

                  invoice.paymentStatus ===
                  "PENDING"

                  &&

                  <button

                    onClick={() =>
                      markAsPaid(
                        invoice.invoiceId
                      )
                    }

                  >

                    Mark Paid

                  </button>

                }

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Invoices;