import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";

import Dashboard from "./pages/Dashboard";
import PlaceOrder from "./pages/PlaceOrder";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/*"
          element={

            <div className="dashboard">

              <div className="sidebar">

                <h2>Billing App</h2>

                <Link to="/dashboard">
                   Dashboard
                </Link>

                <Link to="/products">
                  Products
                </Link>

                <Link to="/customers">
                  Customers
                </Link>

                <Link to="/orders">
                  Orders
                </Link>

                <Link to="/invoices">
                  Invoices
                </Link>

                <Link to="/place-order">
  Place Order
</Link>

                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>

              </div>

              <div className="content">

                <Routes>


                        <Route
                 path="/dashboard"
                 element={<Dashboard />}
                 />

                  <Route
                    path="/products"
                    element={<Products />}
                  />

                  <Route
                    path="/customers"
                    element={<Customers />}
                  />

                  <Route
                    path="/orders"
                    element={<Orders />}
                  />

                  <Route
                    path="/invoices"
                    element={<Invoices />}
                  />

                  <Route
  path="/place-order"
  element={<PlaceOrder />}
/>

                </Routes>

              </div>

            </div>

          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;