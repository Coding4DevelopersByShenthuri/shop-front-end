import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import QRCode from "qrcode"; // Use QRCode for generating codes
import { FiDownload } from 'react-icons/fi'; // Download icon from react-icons

const ManageStaffs = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:3000/staff/all-staffs") // API endpoint for fetching staff members
      .then(res => res.json())
      .then(data => {
        setAllStaffs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching staff data:', err);
        setError('Failed to fetch staff data. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Function to generate and download the QR code as an image
  const downloadQrCode = (staffId) => {
    QRCode.toDataURL(staffId, { width: 300, margin: 2 }, (err, url) => {
      if (err) {
        console.error("Error generating QR Code:", err);
        return;
      }
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${staffId}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  // Delete a staff member with confirmation
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
    return <p>{error}</p>; // Display error message
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
            <Table.HeadCell>QR Code</Table.HeadCell>
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
                  {/* Merged button with text and icon */}
                  <button
                    onClick={() => downloadQrCode(staff._id)}
                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-700">
                    Get QR
                    <FiDownload className='ml-2' />
                  </button>
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
