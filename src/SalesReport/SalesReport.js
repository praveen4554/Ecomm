import React, { useState } from "react";
import "./SalesReport.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { COMPANY_DETAILS, REPORT_DETAILS, PRODUCTS, TABLE_HEADERS } from "./constants";

const SalesReport = () => {
    // State variables
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("All Products");

    // Variables for dynamic data
    const reportNumber = REPORT_DETAILS.reportNumber; // Report number variable
    const currentDate = REPORT_DETAILS.reportDate; // Report date variable
    const productOptions = PRODUCTS; // Array for dropdown options

    const salesData = [
        { name: "Product 1", quantitySold: 10, salePrice: 100, revenue: 1000, date: "2023-10-01" },
        { name: "Product 2", quantitySold: 20, salePrice: 200, revenue: 4000, date: "2023-10-02" },
        { name: "Product 3", quantitySold: 30, salePrice: 300, revenue: 9000, date: "2023-10-03" },
        { name: "Product 4", quantitySold: 40, salePrice: 400, revenue: 16000, date: "2023-10-04" },
        { name: "Product 5", quantitySold: 50, salePrice: 500, revenue: 25000, date: "2023-10-05" },
    ];

    // Filtered sales data
    const filteredData = salesData.filter((item) => {
        const isInDateRange =
            (!startDate || new Date(item.date) >= new Date(startDate)) &&
            (!endDate || new Date(item.date) <= new Date(endDate));
        const isProductSelected =
            selectedProduct === "All Products" || item.name === selectedProduct;
        return isInDateRange && isProductSelected;
    });

    return (
        <div className="sales-report-container">
            {/* Company Details */}
            <div className="header-section">
                <h1>{COMPANY_DETAILS.name}</h1>
                <p>{COMPANY_DETAILS.addressLine1}</p>
                <p>{COMPANY_DETAILS.addressLine2}</p>
                <p>{COMPANY_DETAILS.city}</p>
                <p>Phone: {COMPANY_DETAILS.phone}</p>
                <p>Email: {COMPANY_DETAILS.email}</p>
            </div>

            {/* Report Info */}
            <div className="report-info-section">
                <h2>Sales Report</h2>
                <p>Report Number: {reportNumber}</p> {/* Using report number variable */}
                <p>Date: {currentDate}</p> {/* Using date variable */}
            </div>

            {/* Filters */}
            <div className="filters-section">
                <h3>Sales Data</h3>
                <div className="filters-inline">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <label htmlFor="product">Select Product:</label>
                    <select
                        id="product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        {productOptions.map((product, index) => (
                            <option key={index} value={product}>
                                {product}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Sales Details */}
            <div className="sales-details-section">
                <h3>Sales Details</h3>
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEADERS.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantitySold}</td>
                                <td>${item.salePrice}</td>
                                <td>${item.revenue}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
