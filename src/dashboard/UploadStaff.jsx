import React, { useState, useEffect } from 'react';

const UploadStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [staffImage, setStaffImage] = useState(null);
  const [staffDetails, setStaffDetails] = useState({
    name: '',
    department: '',
    role: ''
  });
  const [loading, setLoading] = useState(false); // Loading state for image upload

  // Fetch all staff on component load
  useEffect(() => {
    fetch("http://localhost:3000/staff/all-staffs") // Ensure this route is correct
      .then(res => res.json())
      .then(data => setStaffData(data))
      .catch(err => console.error("Error fetching staff:", err));
  }, []);

  // Fetch staff details when a staff ID is selected
  const handleStaffChange = (e) => {
    const staffId = e.target.value;
    setSelectedStaffId(staffId);

    if (staffId) {
      const selectedStaff = staffData.find(staff => staff._id === staffId);
      if (selectedStaff) {
        setStaffDetails({
          name: selectedStaff.name,
          department: selectedStaff.department,
          role: selectedStaff.role
        });
      }
    } else {
      setStaffDetails({ name: '', department: '', role: '' });
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setStaffImage(e.target.files[0]);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!staffImage) {
      alert('Please select an image to upload.');
      return;
    }

    if (!selectedStaffId) {
      alert('Please select a staff member.');
      return;
    }

    setLoading(true); // Start loading

    const formDataToSend = new FormData();
    formDataToSend.append('staffId', selectedStaffId);
    formDataToSend.append('image', staffImage);

    fetch('http://localhost:3000/staff/upload-staff-image', { // Ensure this route is correct
      method: 'POST',
      body: formDataToSend
    })
      .then(res => res.json())
      .then(data => {
        alert('Staff image uploaded successfully!');
        // Update the staffData to include the new image URL
        setStaffData(prevData => 
          prevData.map(staff => 
            staff._id === selectedStaffId ? { ...staff, imageUrl: data.imageUrl } : staff
          )
        );
        setStaffImage(null); // Reset image after submission
        setSelectedStaffId(''); // Reset selected staff
        setStaffDetails({ name: '', department: '', role: '' }); // Clear staff details
        setLoading(false); // End loading
      })
      .catch(err => {
        console.error("Error uploading staff image:", err);
        alert("Failed to upload image. Please try again."); // User-friendly error message
        setLoading(false); // End loading
      });
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold text-center">Upload Staff Image</h2>
      
      <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block mb-2 text-lg">Select Staff</label>
          <select 
            value={selectedStaffId} 
            onChange={handleStaffChange} 
            className="border p-2 w-full rounded" 
            required
          >
            <option value="">-- Select Staff --</option>
            {staffData.map(staff => (
              <option key={staff._id} value={staff._id}>{staff.name}</option>
            ))}
          </select>
        </div>

        {staffDetails.name && (
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <h3 className="font-bold text-lg">Staff Details</h3>
            <p><strong>Name:</strong> {staffDetails.name}</p>
            <p><strong>Department:</strong> {staffDetails.department}</p>
            <p><strong>Role:</strong> {staffDetails.role}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 text-lg">Image</label>
          <input 
            type="file" 
            accept="image/*" // Only accept image files
            onChange={handleFileChange} 
            className="border p-2 w-full rounded-md" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <h2 className="mt-12 text-3xl font-bold text-center">All Staffs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {staffData.length > 0 ? staffData.map((staff) => (
          <div key={staff._id} className="bg-white shadow-lg rounded-lg flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              {staff.imageUrl ? (
                <img 
                  src={`http://localhost:3000${staff.imageUrl}`}  // Use the correct image URL
                  alt={staff.name} 
                  className="w-full h-64 object-cover rounded mb-2" 
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded mb-2">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold">{staff.name}</h3>
              <p>Department: {staff.department}</p>
              <p>Role: {staff.role}</p>
            </div>
          </div>
        )) : (
          <div className="col-span-3 text-center text-gray-500">
            No staff members available.
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadStaff;
