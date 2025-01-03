import React, { useState } from "react";
import QrScanner from "react-qr-scanner"; // Import the QR scanner
import axios from "axios";
import "./QRCodePage.css"; // Ensure to have styles defined here

const QRCodePage = () => {
  const [error, setError] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  const [isScanning, setIsScanning] = useState(true); // State to manage scanner visibility
  const [isProcessing, setIsProcessing] = useState(false); // Flag to prevent multiple scans
  const [zoom, setZoom] = useState(false); // State to manage zoom level

  const handleScan = async (data) => {
    if (data && !isProcessing) {
      setIsProcessing(true); // Set the flag to prevent further processing

      // Play sound on successful scan
      const audio = new Audio('/sounds/scan-sound.mp3'); // Adjust the path as necessary
      audio.play().catch(err => console.error("Audio playback failed:", err));

      await handleScannedData(data);
      setIsProcessing(false); // Reset the flag after processing
    }
  };

  const handleError = (err) => {
    console.error("Scanning error:", err);
    setError(err);
  };

  const handleScannedData = async (data) => {
    try {
      if (data?.text) {
        // Fetch staff details based on scanned QR code
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/attendance/mark-attendance`, {
          staffId: data.text
        });

        if (response.status === 201 && response.data) {
          const staff = response.data?.data;
          setStaffData(staff); // Set staff details to display (name, role)
          setIsPresent(true); // Mark them as present (green tick)
          setIsScanning(false); // Hide the scanner
        } else {
          alert("Failed to mark attendance. Please try again.");
        }
      } else {
        alert("Invalid QR code data. Please scan a valid code.");
      }
    } catch (error) {
      alert("An error occurred while marking attendance.");
    }
  };

  const handleNewScan = () => {
    // Reset states for a new scan
    setStaffData(null);
    setIsPresent(false);
    setIsScanning(true);
    setError(null);
    setIsProcessing(false); // Reset the processing flag for new scan
  };

  const toggleZoom = () => {
    setZoom(prevZoom => !prevZoom); // Toggle the zoom state
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scan QR Code to Mark Attendance</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      
      {isScanning ? (
        <div className={`scanner-container ${zoom ? 'zoom' : ''}`}>
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", maxWidth: "600px" }}
          />
          <button onClick={toggleZoom} className="zoom-button">
            {zoom ? "Reset Zoom" : "Zoom In"}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          {isPresent ? (
            <div>
              <h3 className="text-lg font-semibold">Attendance Marked!</h3>
              {staffData && (
                <div>
                  <p>Name: {staffData.name}</p>
                  <p>Staff ID: {staffData.staffId}</p>
                  <p>Date: {staffData.date}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Attendance could not be marked.</p>
          )}
          <button 
            onClick={handleNewScan} 
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Scan New QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
