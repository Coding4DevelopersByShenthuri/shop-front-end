import React, { useEffect, useState } from "react";

const StaffAttendance = () => {
  const [staffList, setStaffList] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date

  // Fetch staff data on component mount
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch("http://localhost:3000/staff/all-staffs"); // Update the URL if needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStaffList(data); // Set the staff list in state
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, []);

  // Handle attendance checkbox toggle
  const handleAttendanceChange = (staffId) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: !prev[staffId], // Toggle attendance (true/false)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if date is selected
    if (!selectedDate) {
      alert("Please select a date for attendance.");
      return;
    }

    // Prepare attendance data to send to the backend
    const attendanceEntries = staffList.map((staff) => ({
      staffId: staff._id,
      name: staff.name,
      present: !!attendanceData[staff._id], // true if checked, false if not
      date: selectedDate, // Include the selected date
    }));

    // Send attendance data to backend
    try {
      const response = await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendanceEntries, selectedDate }), // Send both attendance data and selected date
      });

      if (response.ok) {
        alert("Attendance updated successfully!");
      } else {
        alert("Error updating attendance. Please try again.");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="staff-attendance p-5">
      <h2 className="text-xl font-bold mb-4">Staff Attendance</h2>
      <form onSubmit={handleSubmit}>
        {/* Date Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="attendance-date">
            Select Date:
          </label>
          <input
            type="date"
            id="attendance-date"
            className="border border-gray-300 p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)} // Update the selected date
            required
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{staff.name}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={attendanceData[staff._id] || false} // Checkbox checked state based on attendance data
                    onChange={() => handleAttendanceChange(staff._id)} // Update attendance state for the staff member
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-700 text-white hover:bg-blue-600 py-3 text-md rounded-md"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default StaffAttendance;
