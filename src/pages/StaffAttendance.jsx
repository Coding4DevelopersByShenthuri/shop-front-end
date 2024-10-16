import React, { useEffect, useState } from "react";

const StaffAttendance = () => {
  const [staffList, setStaffList] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // Fetch staff data from the API
    const fetchStaffData = async () => {
      try {
        const response = await fetch("http://localhost:3000/staff"); // Adjust the URL according to your API
        const data = await response.json();
        setStaffList(data);
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
      await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      });
      alert("Attendance updated successfully!");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="staff-attendance">
      <h2>Staff Attendance</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendanceData[staff.id] || false}
                    onChange={() => handleAttendanceChange(staff.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default StaffAttendance;
