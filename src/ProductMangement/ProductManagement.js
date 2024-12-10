import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ProductManagemet.css"

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (form.name && form.price && form.quantity && form.supplier) {
      setProductList([
        ...productList,
        { ...form, date: new Date().toLocaleDateString() },
      ]);
      setForm({ name: "", price: "", quantity: "", supplier: "" });
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", quantity: "", supplier: "" });
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setProductList((prevList) => [...prevList, ...data]);
      };
     reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>

      <div className="mb-4">
        <h4>Add Product</h4>
        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={form.supplier}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            Add
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-danger">
            Cancel
          </button>
        </form>
      </div>

      <div className="mb-4">
        <h4>Import Products from Excel</h4>
        <input type="file" onChange={handleImportExcel} className="form-control" />
      </div>

      <h4>Product List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.supplier}</td>
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
