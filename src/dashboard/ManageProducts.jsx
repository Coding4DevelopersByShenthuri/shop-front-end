import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import QRCode from "qrcode"; // Import the QRCode generation library
import { FiDownload } from 'react-icons/fi'; // Import a download icon from react-icons

const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/product/all-products`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Function to generate and download the QR code as an image
  const downloadQrCode = (productId) => {
    QRCode.toDataURL(productId, { width: 300, margin: 2 }, (err, url) => {
      if (err) {
        console.error("Error generating QR Code:", err);
        return;
      }
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${productId}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  // Delete a product with confirmation
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

    if (isConfirmed) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/product/product/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(data => {
          alert("Product deleted successfully!");
          setAllProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        })
        .catch(err => {
          console.error('Error deleting product:', err);
          alert("There was an issue deleting the product.");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight font-sans'>Manage Products</h2>
        <Link 
          to="/admin/dashboard/upload" 
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          Add New Product
        </Link>
      </div>

      {allProducts.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-lg">No products available in the inventory.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Table hoverable className='min-w-full'>
              <Table.Head className="bg-gray-50 border-b border-gray-100">
                <Table.HeadCell className="py-4">No.</Table.HeadCell>
                <Table.HeadCell className="py-4">Name</Table.HeadCell>
                <Table.HeadCell className="py-4">Category</Table.HeadCell>
                <Table.HeadCell className="py-4">Stock</Table.HeadCell>
                <Table.HeadCell className="py-4">Price</Table.HeadCell>
                <Table.HeadCell className="py-4 text-center">Actions</Table.HeadCell>
                <Table.HeadCell className="py-4 text-center">QR Code</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y divide-gray-100'>
                {allProducts.map((product, index) => (
                  <Table.Row className="bg-white hover:bg-gray-50/50 transition-colors" key={product._id}>
                    <Table.Cell className='font-medium text-gray-900'>
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className='font-semibold text-gray-900'>
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase">
                        {product.category}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className={`font-medium ${product.stock_quantity < 10 ? 'text-red-600' : 'text-gray-700'}`}>
                        {product.stock_quantity} {product.unit}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="font-bold text-slate-900">
                      Rs {product.price}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center items-center gap-3">
                        <Link
                          className="px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                          to={`/admin/dashboard/edit-products/${product._id}`}>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className='px-3 py-1.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-md hover:bg-rose-100 transition-colors'>
                          Delete
                        </button>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center">
                        <button
                          onClick={() => downloadQrCode(product._id)}
                          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-slate-900 transition-all active:scale-95 shadow-sm">
                          QR
                          <FiDownload className='w-4 h-4' />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
