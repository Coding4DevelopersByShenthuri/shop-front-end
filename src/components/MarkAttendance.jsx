// src/components/MarkAttendance.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarkAttendance = ({ staffId, token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const markAttendance = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/mark-attendance?staffId=${staffId}&token=${token}`);
        if (response.data.success) {
          // Successfully marked attendance, redirect to another page
          navigate("/attendance"); // Adjust this route as needed
        } else {
          console.error("Error marking attendance:", response.data.message);
        }
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    };

    markAttendance();
  }, [staffId, token, navigate]);

  return (
    <div>
      <h2>Marking Attendance...</h2>
      <p>Please wait while we process your attendance.</p>
    </div>
  );
};

export default MarkAttendance;
