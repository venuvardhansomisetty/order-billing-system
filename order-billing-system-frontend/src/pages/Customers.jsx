import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      "https://order-billing-system.onrender.com/customers",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setCustomers(response.data);

  };

  const addCustomer = async () => {

    const token =
      localStorage.getItem("token");

    await axios.post(
      "https://order-billing-system.onrender.com/customers",
      {
        name,
        email,
        phone,
        address
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchCustomers();

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");

  };

  const updateCustomer = async () => {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `https://order-billing-system.onrender.com/customers/${editId}`,
      {
        name: editName,
        email: editEmail,
        phone: editPhone,
        address: editAddress
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchCustomers();

    setEditId(null);

  };

  const deleteCustomer = async (id) => {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `https://order-billing-system.onrender.com/customers/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchCustomers();

  };

  return (

    <div className="page-container">

      <h2>Customers</h2>

      <div className="form-card">

        <h3>Add Customer</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)}
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>

      </div>

      {editId && (

        <div className="form-card">

          <h3>Edit Customer</h3>

          <input
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)}
          />

          <input
            value={editEmail}
            onChange={(e) =>
              setEditEmail(e.target.value)}
          />

          <input
            value={editPhone}
            onChange={(e) =>
              setEditPhone(e.target.value)}
          />

          <input
            value={editAddress}
            onChange={(e) =>
              setEditAddress(e.target.value)}
          />

          <button
            onClick={updateCustomer}
          >
            Update Customer
          </button>

        </div>

      )}

      <input
  className="search-box"
  placeholder="Search Customer..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)}
/>

      <table className="data-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {customers
  .filter(customer =>
    customer.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map(customer => (

            <tr
              key={customer.customerId}
            >

              <td>{customer.customerId}</td>

              <td>{customer.name}</td>

              <td>{customer.email}</td>

              <td>{customer.phone}</td>

              <td>{customer.address}</td>

              <td>

                <button

                  onClick={() => {

                    setEditId(
                      customer.customerId
                    );

                    setEditName(
                      customer.name
                    );

                    setEditEmail(
                      customer.email
                    );

                    setEditPhone(
                      customer.phone
                    );

                    setEditAddress(
                      customer.address
                    );

                  }}

                >

                  Edit

                </button>

                <button

                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white"
                  }}

                  onClick={() =>
                    deleteCustomer(
                      customer.customerId
                    )
                  }

                >

                  Delete

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Customers;