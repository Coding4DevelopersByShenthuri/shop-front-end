import React, { useEffect, useRef, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code"; // Import QRCode component

const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const qrCodeRef = useRef(null); // Ref for QR code

  useEffect(() => {
    fetch("http://localhost:3000/product/all-products")
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

  // Function to download the QR code as an image
  const downloadQrCode = (product) => {
    const qrCodeElement = qrCodeRef.current;

    // Check if it's rendered as SVG
    const svg = qrCodeElement?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Create an image element to convert the SVG
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Set canvas size to match QR code size
        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;
        ctx.drawImage(img, 0, 0);

        // Create a PNG URL and trigger download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${product._id}-qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url); // Clean up the URL
      };
      img.src = url; // Start loading the image
    }
  };

  // Delete a product with confirmation
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

    if (isConfirmed) {
      fetch(`http://localhost:3000/product/product/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(data => {
          alert("Product deleted successfully!");
          // Remove the deleted product from the state
          setAllProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        })
        .catch(err => {
          console.error('Error deleting product:', err);
          alert("There was an issue deleting the product.");
        });
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Products</h2>
      {allProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Table className='lg:w-[1180px]'>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Unit</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
            <Table.HeadCell>Download QR</Table.HeadCell>
          </Table.Head>
          {allProducts.map((product, index) => (
            <Table.Body className='divide-y' key={product._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {index + 1}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {product.name}
                </Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.stock_quantity}</Table.Cell>
                <Table.Cell>{product.unit}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 dark:text-cyan-500 hover:underline mr-5"
                    to={`/admin/dashboard/edit-products/${product._id}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <div ref={qrCodeRef} style={{ cursor: 'pointer' }} onClick={() => downloadQrCode(product)}>
                    <QRCode value={product._id} />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      )}
    </div>
  );
};

export default ManageProducts;
