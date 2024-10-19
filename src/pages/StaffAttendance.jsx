import React, { useEffect, useState } from "react";

const StaffAttendance = () => {
  const [staffList, setStaffList] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // Fetch staff data from the API
    const fetchStaffData = async () => {
      try {
        const response = await fetch("http://localhost:3000/staff/all-staffs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStaffList(data); // Assuming data is an array of staff objects
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, []);

  const handleAttendanceChange = (staffId) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: !prev[staffId], // Toggle attendance
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the attendance data and send it to the backend
    try {
      const attendanceEntries = staffList.map((staff) => ({
        staffId: staff._id,
        name: staff.name,
        present: !!attendanceData[staff._id], // true if checked, false if not
      }));

      await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceEntries), // Send structured data
      });

      alert("Attendance updated successfully!");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="staff-attendance p-5">
      <h2 className="text-xl font-bold mb-4">Staff Attendance</h2>
      <form onSubmit={handleSubmit}>
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
                    checked={attendanceData[staff._id] || false} // Use _id as the key
                    onChange={() => handleAttendanceChange(staff._id)} // Use _id as the key
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="mt-6 w-full bg-blue-700 text-white hover:bg-blue-600 py-3 text-md rounded-md">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default StaffAttendance;
