import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import { AuthContext } from '../contexts/AuthProvider';

const BillingComponent = () => {
  const [productId, setProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [error, setError] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [cashAmount, setCashAmount] = useState(0); // State for cash amount
  const { user } = useContext(AuthContext);

  // Fetch product from API based on ID
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      return null;
    }
  };

  const handleAddProduct = async () => {
    const product = await fetchProduct(productId);
    if (product) {
      setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
    setProductId('');
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = quantity;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrintToPdf = (orderNumber) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a6', orientation: 'portrait' });

    // Set font styles
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Add header with centered shop name
    doc.setFontSize(12);
    doc.text("Shenthu MART", 53, 10, { align: 'center' }); // Centered text
    doc.setFontSize(10);
    doc.text("Main Street, Jaffna.", 53, 15, { align: 'center' }); // Centered address
    doc.text("Mobile: +94 77 123 4567", 53, 20, { align: 'center' }); // Centered mobile number

    // Printed date and bill number
    const printedDate = new Date().toLocaleDateString();
    doc.text(`Date: ${printedDate}`, 10, 30);
    doc.text(`Bill No: OR${orderNumber}`, 70, 30);

    // Line separator
    doc.line(10, 35, 90, 35); // Horizontal line

    // Add products
    let startY = 40; // Starting Y position for products
    products.forEach((product, index) => {
      const itemText = `${index + 1}. ${product.name}`; // Product name
      const quantityText = `x ${product.quantity}`; // Quantity
      const priceText = `Rs ${product.quantity * product.price}`; // Price

      const itemY = startY + index * 6; // Vertical spacing between items

      // Add product details
      doc.text(itemText, 10, itemY); // Product name (left)
      doc.text(quantityText, 60, itemY); // Quantity (center)
      doc.text(priceText, 80, itemY); // Price (right)
    });

    // Calculate total
    const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
    startY += products.length * 6; // Position for total
    doc.line(10, startY + 2, 90, startY + 2); // Line above total
    doc.text(`Total: Rs ${totalAmount}`, 10, startY + 8); // Total amount

    // Footer with thank you note
    startY += 12; // Space before footer
    doc.setFontSize(8);
    doc.text("Thank you for shopping!", 53, startY, { align: 'center' });
    doc.text("Come again soon!", 53, startY + 5, { align: 'center' });

    // Save the PDF
    doc.save('bill.pdf');
  };


  const handleSubmit = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/order/add-order`, { userId: user.userDetails[0]?._id, orderDetail: products });
    handlePrintToPdf(res.data?.orderNumber); // Call the print function when submitting
    setProducts([]); // Clear bill on submit#
    setCashAmount(0); // Reset cash amount
  };

  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle QR Scan result
  const handleScan = async (data) => {
    if (data) {
      const scannedProductId = data.text;
      setProductId(scannedProductId); // Set scanned product ID
      const product = await fetchProduct(scannedProductId); // Fetch product using scanned ID
      if (product) {
        setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
      }
      setIsPresent(true); // Indicate the product was added
      setShowQrPopup(false); // Close QR popup after scan
      setIsScanning(false); // Stop scanning
      setProductId('');
    }
  };

  // Handle QR scan error
  const handleError = (err) => {
    console.error('QR Scan Error:', err);
    setError(err); // Set error if there is an issue during scanning
  };

  const handleNewScan = () => {
    setIsScanning(true); // Reset for new scan
    setIsPresent(false);
    setError(null); // Reset errors
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6 flex space-x-6">

        {/* Left Section - Product Input and List */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Product</h2>

          {/* Input box */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowQrPopup(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Scan QR
            </button>
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Product
            </button>
          </div>

          {/* QR Code Popup */}
          {showQrPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
                {error && <p className="text-red-500">Error: {error.message}</p>}

                {isScanning ? (
                  <div className="scanner-container">
                    <QrScanner
                      delay={300}
                      onError={handleError}
                      onScan={handleScan}
                      style={{ width: "100%", maxWidth: "400px" }}
                    />
                  </div>
                ) : (
                  <div className="mt-4">
                    {isPresent ? (
                      <div>
                        <h3 className="text-lg font-semibold">Product Added!</h3>
                      </div>
                    ) : (
                      <p>QR code could not be scanned. Please try again.</p>
                    )}
                    <button
                      onClick={handleNewScan}
                      className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                      Scan New QR Code
                    </button>
                    <button
                      onClick={() => setShowQrPopup(false)}
                      className="mt-4 p-2 bg-red-500 text-white rounded">
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products Table */}
          <h3 className="text-xl font-semibold mb-2 text-gray-600">Products List</h3>
          <div className="overflow-auto max-h-60">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-2 border-r">Product Name</th>
                  <th className="text-center p-2 border-r">Quantity</th>
                  <th className="text-right p-2 border-r">Price (Rs)</th>
                  <th className="text-center p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 border-r">{product.name}</td>
                    <td className="p-2 text-center border-r">
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                        className="w-16 p-1 border rounded"
                        min="1"
                      />
                    </td>
                    <td className="p-2 text-right border-r">Rs {product.price}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-500 hover:text-red-600">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section - Bill Summary */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Bill Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-center font-bold text-xl mb-4 text-gray-700">Shenthu MART</h3>
            <p className="text-center text-gray-600 mb-2">Main Street, Jaffna.</p>
            <p className="text-center text-gray-600 mb-6">Receipt</p>

            <ul className="mb-4">
              {products.map((product, index) => (
                <li key={index} className="flex justify-between mb-2 text-gray-600">
                  <span>{product.name} x {product.quantity}</span>
                  <span>Rs {product.quantity * product.price}</span>
                </li>
              ))}
            </ul>

            {/* Displaying Total Amount */}
            <div className="mb-4">
              <p className="font-semibold">Total Amount: Rs {totalAmount}</p>
              {/* <p className="font-semibold">Bill Number: {billNumber}</p> */}

              {/* Input box for Cash Amount */}
              <div className="flex items-center mt-2">
                <label htmlFor="cashAmount" className="mr-2">Cash Amount:</label>
                <input
                  id="cashAmount"
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="border rounded w-32 p-1"
                  min="0"
                />
              </div>

              <p className="font-semibold">Change: Rs {cashAmount >= totalAmount ? cashAmount - totalAmount : 0}</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Thank you for shopping!</p>
              <p className="text-gray-500 text-sm">Come again soon!</p>
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full mt-6 px-4 py-2 rounded text-white ${products.length === 0 ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              disabled={products.length === 0}
            >
              Submit and Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
