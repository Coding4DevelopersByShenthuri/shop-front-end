import React, { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";

function AddNewStaff() {
  const staffRoles = [
    "Select Role",
    "Manager",
    "Cashier",
    "Sales Associate",
    "Stock Clerk",
    "Security",
    "Cleaner",
    "Accountant",
    "Customer service",
    "Warehouse Staff",
    "HR"
  ];

  const staffDepartments = [
    "Select Department",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Security",
    "Maintenance"
  ];

  const staffLocations = [
    "Select Location",
    "Head Office",
    "Branch A",
    "Branch B",
    "Branch C"
  ];

  const [selectedStaffRole, setSelectedStaffRole] = useState(staffRoles[0]);
  const [selectedStaffDepartment, setSelectedStaffDepartment] = useState(staffDepartments[0]);
  const [selectedStaffLocation, setSelectedStaffLocation] = useState(staffLocations[0]);

  // handle staff submission
  const handleStaffSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const staffId = form.staffId.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const role = selectedStaffRole;
    const department = selectedStaffDepartment;
    const location = selectedStaffLocation;

    if (role === "Select Role" || department === "Select Department" || location === "Select Location") {
      alert("Please select valid options for Role, Department, and Location.");
      return;
    }

    const staffObj = {
      staffId,
      name,
      email,
      phone,
      role,
      department,
      location
    };


    // Send staff data to db
    fetch(`${import.meta.env.VITE_API_BASE_URL}/staff/add-staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffObj)
    })
    .then(res => res.json())
    .then(data => {
      alert("Staff added successfully!");
      // Reset the form after successful submission
      form.reset();
      setSelectedStaffRole(staffRoles[0]);
      setSelectedStaffDepartment(staffDepartments[0]);
      setSelectedStaffLocation(staffLocations[0]);
    })
    .catch((error) => {
      console.error("Error adding staff:", error);
      alert("Failed to add staff. Please try again.");
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Add New Staff</h2>

      <form onSubmit={handleStaffSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row */}
        <div className='flex gap-8'>
          {/* Staff ID */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="staffId" value="Staff ID" />
            </div>
            <TextInput
              id="staffId"
              name="staffId"
              placeholder="Staff ID"
              required
              type="text"
            />
          </div>

          {/* Staff Name */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Staff Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              placeholder="Staff name"
              required
              type="text"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          {/* Role */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Staff Role" />
            </div>

            <select
              id='role'
              name='role'
              className="w-full rounded"
              value={selectedStaffRole}
              onChange={(e) => setSelectedStaffRole(e.target.value)}
            >
              {staffRoles.map((option) => (
                <option key={option} value={option} disabled={option === "Select Role"}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="department" value="Department" />
            </div>

            <select
              id='department'
              name='department'
              className="w-full rounded"
              value={selectedStaffDepartment}
              onChange={(e) => setSelectedStaffDepartment(e.target.value)}
            >
              {staffDepartments.map((option) => (
                <option key={option} value={option} disabled={option === "Select Department"}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Third Row */}
        <div className='flex gap-8'>
          {/* Location */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location" />
            </div>

            <select
              id='location'
              name='location'
              className="w-full rounded"
              value={selectedStaffLocation}
              onChange={(e) => setSelectedStaffLocation(e.target.value)}
            >
              {staffLocations.map((option) => (
                <option key={option} value={option} disabled={option === "Select Location"}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fourth Row */}
        <div className='lg:w-1/3 w-full max-w-xs'>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <TextInput
            id="phone"
            name="phone"
            placeholder="+94 xxxx xxxxx"
            required
            type="tel"
            pattern="[0-9]*"
          />
        </div>

        {/* Fifth Row */}
        <div className='flex gap-8'>
          {/* Email */}
          <div className='lg:w-1/3'>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              placeholder="Staff email"
              required
              type="email"
            />
          </div>
        </div>

        <Button type="submit" className="mt-5 w-80 bg-blue-700 text-white hover:bg-blue-500">
          Add Staff
        </Button>
      </form>
    </div>
  );
};

export default AddNewStaff;
