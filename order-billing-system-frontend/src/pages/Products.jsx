import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [search, setSearch] = useState("");

  

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      "https://order-billing-system.onrender.com/products",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setProducts(response.data);
  };

  const addProduct = async () => {

    const token =
      localStorage.getItem("token");

    await axios.post(
      "https://order-billing-system.onrender.com/products",
      {
        name,
        price,
        stockQuantity
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchProducts();

    setName("");
    setPrice("");
    setStockQuantity("");

  };

  const updateProduct = async () => {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `https://order-billing-system.onrender.com/products/${editId}`,
      {
        name: editName,
        price: editPrice,
        stockQuantity: editStock
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchProducts();

    setEditId(null);

  };

  const deleteProduct = async (id) => {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `https://order-billing-system.onrender.com/products/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchProducts();

  };

  return (

    <div className="page-container">

      <h2>Products</h2>

      <div className="form-card">

        <h3>Add Product</h3>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)}
        />

        <input
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) =>
            setStockQuantity(e.target.value)}
        />

        <button onClick={addProduct}>
          Add Product
        </button>

      </div>

      {editId && (

        <div className="form-card">

          <h3>Edit Product</h3>

          <input
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)}
          />

          <input
            value={editPrice}
            onChange={(e) =>
              setEditPrice(e.target.value)}
          />

          <input
            value={editStock}
            onChange={(e) =>
              setEditStock(e.target.value)}
          />

          <button
            onClick={updateProduct}
          >
            Update Product
          </button>

        </div>

      )}

      <input
  className="search-box"
  placeholder="Search Product..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)}
/>

      <table className="data-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products
  .filter(product =>
    product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map(product => (
            <tr
              key={product.productId}
            >

              <td>{product.productId}</td>

              <td>{product.name}</td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {product.stockQuantity}
              </td>

              <td>

                <button

                  onClick={() => {

                    setEditId(
                      product.productId
                    );

                    setEditName(
                      product.name
                    );

                    setEditPrice(
                      product.price
                    );

                    setEditStock(
                      product.stockQuantity
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
                    deleteProduct(
                      product.productId
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

export default Products;