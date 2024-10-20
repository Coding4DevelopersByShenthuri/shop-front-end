import React, { useState } from "react";
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import axios from "axios";

const QRCodePage = ({ onScanSuccess }) => {
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      console.log("Scanned data:", data);
      
      // Process the scanned data
      await handleScannedData(data);
      
      // Call the success callback if provided
      if (onScanSuccess) {
        onScanSuccess(data);
      }
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
        // Call your backend endpoint to mark attendance
        const response = await axios.post("http://localhost:3000/mark-attendance", {
          staffId,
          token,
        });

        // Check for response success
        if (response.status === 200) {
          alert("Attendance marked successfully for staff ID: " + staffId);
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
    </div>
  );
};

export default QRCodePage;
