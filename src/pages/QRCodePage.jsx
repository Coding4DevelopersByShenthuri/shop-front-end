import React, { useState } from "react";
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import axios from "axios";

const QRCodePage = () => {
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [staffData, setStaffData] = useState(null); // To store staff details
  const [isPresent, setIsPresent] = useState(false); // To track attendance
  const [isScanned, setIsScanned] = useState(false); // To track if QR has been scanned

  const handleScan = async (data) => {
    if (data && !isScanned) {
      setScanResult(data);
      console.log("Scanned data:", data);

      // Process the scanned data
      await handleScannedData(data);
      setIsScanned(true); // Mark as scanned to prevent double processing
    }
  };

  const handleError = (err) => {
    console.error("Scanning error:", err);
    setError(err);
  };

  const handleScannedData = async (data) => {
    try {
      // Check if data contains a valid URL with parameters
      const urlParams = new URLSearchParams(data.split("?")[1]);
      const staffId = urlParams.get("staffId");
      const token = urlParams.get("token");

      if (staffId && token) {
        // Fetch staff details based on scanned QR code
        const response = await axios.post("http://localhost:3000/attendance/mark-attendance", {
          staffId,
          token,
        });

        if (response.status === 200 && response.data) {
          const staff = response.data.staff;
          setStaffData(staff); // Set staff details to display (name, role)
          setIsPresent(true); // Mark them as present (green tick)
          alert("Attendance marked successfully for: " + staff.name);
        } else {
          alert("Failed to mark attendance. Please try again.");
        }
      } else {
        alert("Invalid QR code data. Please scan a valid code.");
      }
    } catch (error) {
      console.error("Error processing scanned data:", error);
      alert("Failed to process scanned data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scan QR Code to Mark Attendance</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%", maxWidth: "600px", border: "1px solid #ccc", borderRadius: "8px" }}
      />
      {scanResult && (
        <div className="mt-4">
          <p>Scanned Result: {scanResult}</p>
        </div>
      )}
      {staffData && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <p>Name: <span className="font-semibold">{staffData.name}</span></p>
          <p>Role: <span className="font-semibold">{staffData.role}</span></p>
          <p>Status: 
            {isPresent ? (
              <span className="text-green-500 font-bold">✔ Present</span>
            ) : (
              <span className="text-red-500 font-bold">✘ Absent</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
