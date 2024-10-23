import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import QrScanner from "react-qr-scanner"; // Import the QR scanner

const BillingComponent = () => {
  const [productId, setProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [error, setError] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Fetch product from API based on ID
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/product/product/${id}`);
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

  const handleSubmit = () => {
    console.log('Submitting bill:', products);
    setProducts([]); // Clear bill on submit
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
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 flex space-x-6">
        
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
                      <p>QR code could not be scanned.</p>
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
            
            <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-gray-700">
              <span>Total:</span>
              <span>Rs {totalAmount}</span>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Thank you for shopping!</p>
              <p className="text-gray-500 text-sm">Come again soon!</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit} 
            className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit and Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
