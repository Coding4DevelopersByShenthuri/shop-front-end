import React, { useEffect, useRef, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";

const ManageStaffs = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // New error state
  const qrCodeRef = useRef();

  const downloadQrCode = (staff) => {
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
        downloadLink.download = `${staff._id}-qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url); // Clean up the URL
      };
      img.src = url; // Start loading the image
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/staff/all-staffs") // API endpoint to get all staff members
      .then(res => res.json())
      .then(data => {
        setAllStaffs(data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch(err => {
        console.error('Error fetching staff data:', err);
        setError('Failed to fetch staff data. Please try again later.');
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Delete a staff member
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this staff member?');
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/staff/staff/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        alert("Staff member deleted successfully");
        setAllStaffs(allStaffs.filter(staff => staff._id !== id)); // Remove deleted staff from the list
      })
      .catch(err => {
        console.error('Error deleting staff:', err);
        alert("Failed to delete the staff member.");
      });
  };

  if (loading) {
    return <p>Loading staff data...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display error if there's an issue fetching data
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Staff</h2>
      {allStaffs.length === 0 ? (
        <p>No staff members available.</p>
      ) : (
        <Table className='lg:w-[1180px]'>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
            <Table.HeadCell>Download QR</Table.HeadCell>
          </Table.Head>
          {allStaffs.map((staff, index) => (
            <Table.Body className='divide-y' key={staff._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {index + 1}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {staff.name}
                </Table.Cell>
                <Table.Cell>{staff.role}</Table.Cell>
                <Table.Cell>{staff.email}</Table.Cell>
                <Table.Cell>{staff.phone}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 dark:text-cyan-500 hover:underline mr-5"
                    to={`/admin/dashboard/edit-staffs/${staff._id}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700 ml-2'>
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <div ref={qrCodeRef} style={{ cursor: 'pointer' }} onClick={downloadQrCode(staff)} className='w-11'>
                    <QRCode value={staff._id} className='w-11 h-10' />
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

export default ManageStaffs;
