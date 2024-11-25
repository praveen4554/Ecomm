import React, { useState } from "react";
import "./suppliermanagement.css";

function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSupplier = (e) => {
    e.preventDefault(); 
    if (formData.name && formData.company && formData.address) {
      setSuppliers([...suppliers, formData]);
      setFormData({ name: "", company: "", address: "" });
      alert("Supplier information added successfully");
    } else {
      document.getElementById("supplier-form").reportValidity();
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", company: "", address: "" });
  };

  return (
    <div className="supplier-container">
      <h1>Supplier Management</h1>
      <h2>Add Supplier Information</h2>
      <form id="supplier-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Supplier Name"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Supplier Company"
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          ></textarea>
          <div className="crud-buttons">
            <button type="submit" onClick={handleAddSupplier}>
              Add
            </button>
            <button type="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <h2>Supplier List</h2>
      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Supplier Company</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.name}</td>
              <td>{supplier.company}</td>
              <td>{supplier.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierManagement;
