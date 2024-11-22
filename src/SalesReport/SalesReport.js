import React, { useState } from "react";
import "./SalesReport.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("All Products");

    const salesData = [
        { name: "Product 1", quantitySold: 10, salePrice: 100, revenue: 1000, date: "2023-10-01" },
        { name: "Product 2", quantitySold: 20, salePrice: 200, revenue: 4000, date: "2023-10-02" },
        { name: "Product 3", quantitySold: 30, salePrice: 300, revenue: 9000, date: "2023-10-03" },
        { name: "Product 4", quantitySold: 40, salePrice: 400, revenue: 16000, date: "2023-10-04" },
        { name: "Product 5", quantitySold: 50, salePrice: 500, revenue: 25000, date: "2023-10-05" },
    ];

    const filterSalesData = () => {
        return salesData.filter((item) => {
            const isInDateRange = (!startDate || new Date(item.date) >= new Date(startDate)) &&
                (!endDate || new Date(item.date) <= new Date(endDate));

            const isProductSelected = selectedProduct === "All Products" || item.name === selectedProduct;

            return isInDateRange && isProductSelected;
        });
    };

    const handleGenerateReport = () => {
        const filteredData = filterSalesData();
        console.log("Filtered Sales Data: ", filteredData);
    };


    const handleExportToXLS = () => {
        const filteredData = filterSalesData();
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Data");

        XLSX.writeFile(wb, "Sales_Report.xlsx");
    };


    const handleExportToPDF = () => {
        const filteredData = filterSalesData();

        const doc = new jsPDF();
        doc.text("Sales Report", 20, 10);


        const headers = ["Product Name", "Quantity Sold", "Sale Price", "Total Revenue", "Date"];
        const data = filteredData.map(item => [
            item.name,
            item.quantitySold,
            `$${item.salePrice}`,
            `$${item.revenue}`,
            item.date
        ]);


        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20
        });

        doc.save("Sales_Report.pdf");
    };


    // const handlePrintableView = () => {
    //     const filteredData = filterSalesData();
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.write('<html><head><title>Sales Report</title>');
    //     printWindow.document.write('<style>');
    //     printWindow.document.write('table { border-collapse: collapse; width: 100%; margin: 20px 0; }');
    //     printWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: left; }');
    //     printWindow.document.write('th { background-color: #f2f2f2; }');
    //     printWindow.document.write('body { font-family: Arial, sans-serif; }');
    //     printWindow.document.write('</style>');
    //     printWindow.document.write('<body>');
    //     printWindow.document.write('<h1>Sales Report</h1>');

    //     printWindow.document.write('<table><thead><tr><th>Product Name</th><th>Quantity Sold</th><th>Sale Price</th><th>Total Revenue</th><th>Date</th></tr></thead><tbody>');
    //     filteredData.forEach(item => {
    //         printWindow.document.write(`
    //             <tr>
    //                 <td>${item.name}</td>
    //                 <td>${item.quantitySold}</td>
    //                 <td>$${item.salePrice}</td>
    //                 <td>$${item.revenue}</td>
    //                 <td>${item.date}</td>
    //             </tr>
    //         `);
    //     });

    //     printWindow.document.write('</tbody></table>');
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.print();
    // };
    const handlePrintableView = () => {
        window.print();
    };

    return (
        <div className="sales-report-container">

            <div className="header-section">
                <h1>Company Name</h1>
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City, State, ZIP Code</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@company.com</p>
            </div>

            <div className="report-info-section">
                <h2>Sales Report</h2>
                <p>Report Number: SR-12345</p>
                <p>Date: 2023-10-01</p>
            </div>


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
                        <option>All Products</option>
                        <option>Product 1</option>
                        <option>Product 2</option>
                        <option>Product 3</option>
                        <option>Product 4</option>
                        <option>Product 5</option>
                    </select>

                    <button className="generate-report-btn" onClick={handleGenerateReport}>Generate Report</button>
                </div>
                <div className="export-buttons-inline">
                    <button onClick={handleExportToXLS}>Export to XLS</button>
                    <button onClick={handleExportToPDF}>Export to PDF</button>
                    <button onClick={handlePrintableView}>Printable View</button>
                </div>
            </div>


            <div className="sales-details-section">
                <h3>Sales Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity Sold</th>
                            <th>Sale Price</th>
                            <th>Total Revenue</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSalesData().map((item, index) => (
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
