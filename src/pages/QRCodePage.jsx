import React, { useEffect, useState } from "react";
import axios from "axios";

const QRCodePage = ({ staffId }) => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [dailyToken, setDailyToken] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        // Fetch the daily token from your backend (adjust the URL as needed)
        const tokenResponse = await axios.get("http://localhost:3000/get-daily-token");
        console.log("Token Response:", tokenResponse.data); // Debugging line
        setDailyToken(tokenResponse.data.token); // Assuming your backend returns { token: "..." }

        // Create the URL for the QR code
        const qrCodeUrl = `http://localhost:3000/mark-attendance?staffId=${staffId}&token=${tokenResponse.data.token}`;
        
        // Generate the QR code with the new URL
        const qrCodeResponse = await axios.get(`http://localhost:3000/generate-qr`, {
          params: { url: qrCodeUrl },
        });
        console.log("QR Code Response:", qrCodeResponse.data); // Debugging line
        setQrCodeData(qrCodeResponse.data.qrCodeData);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode();
  }, [staffId]);

  return (
    <div>
      <h2>Scan this QR code to mark your attendance</h2>
      {qrCodeData ? (
        <img src={qrCodeData} alt="QR Code" />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default QRCodePage;
