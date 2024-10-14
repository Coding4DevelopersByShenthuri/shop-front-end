import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, TextInput, Select } from "flowbite-react";

function EditStaffs() {
  const staffRoles = [
    "Select Role",
    "Manager",
    "Sales Associate",
    "Stock Clerk",
    "Cashier",
    "Customer Service",
    "Warehouse Staff"
  ];

  const { id } = useParams(); // Get the staff ID from the URL
  const staffData = useLoaderData(); // Use loader data to get staff details

  // State variables to control form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedStaffRole, setSelectedStaffRole] = useState(staffRoles[0]);

  // Pre-populate the form with staff data from loader
  useEffect(() => {
    if (staffData) {
      setName(staffData.name || '');
      setEmail(staffData.email || '');
      setPhone(staffData.phone || '');
      setSelectedStaffRole(staffData.role || staffRoles[0]);
    }
  }, [staffData]);

  // Handle staff submission
  const handleUpdate = async (event) => {
    event.preventDefault();

    // Validate role selection
    if (selectedStaffRole === "Select Role") {
      alert("Please select a valid role.");
      return;
    }

    const updateStaffObj = {
      name,
      email,
      phone,
      role: selectedStaffRole
    };

    try {
      const response = await fetch(`http://localhost:3000/staff/staff/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateStaffObj)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update staff.');
      }

      const data = await response.json();
      alert("Staff information updated successfully!");

    } catch (error) {
      console.error('Error updating the staff:', error);
      alert("There was an issue updating the staff: " + error.message);
    }
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update Staff Information</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* Staff Name */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Staff Name" />
          </div>
          <TextInput
            id="name"
            name="name"
            value={name}  // Controlled component
            onChange={(e) => setName(e.target.value)}
            placeholder="Staff name"
            required
            type="text"
          />
        </div>

        {/* Email */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Staff Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            value={email}  // Controlled component
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Staff email"
            required
            type="email"
          />
        </div>

        {/* Phone */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Staff Phone" />
          </div>
          <TextInput
            id="phone"
            name="phone"
            value={phone}  // Controlled component
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Staff phone number"
            required
            type="tel"
          />
        </div>

        {/* Role */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="role" value="Staff Role" />
          </div>
          <Select id='role' value={selectedStaffRole} onChange={(e) => setSelectedStaffRole(e.target.value)}>
            {
              staffRoles.map((option) => (
                <option key={option} value={option} disabled={option === "Select Role"}>
                  {option}
                </option>
              ))
            }
          </Select>
        </div>

        <Button type="submit" className="mt-5 w-80 bg-blue-500 text-white hover:bg-blue-700">
          Update Staff
        </Button>
      </form>
    </div>
  );
}

export default EditStaffs;
