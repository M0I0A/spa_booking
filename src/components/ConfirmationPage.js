import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/global.css";
import { QRCodeCanvas } from "qrcode.react";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, note, phone } = location.state || {
    message: "Operation successful!",
    note: "You can perform more actions here.",
    phone: null,
  };

  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    if (phone) {
      const fetchDetails = async () => {
        try {
          const response = await fetch(`https://spa-booking-backend.onrender.com/appointment/${phone}`);
          if (response.ok) {
            const data = await response.json();
            setAppointmentDetails(data);
          } else {
            console.error("Failed to fetch appointment details");
          }
        } catch (error) {
          console.error("Error fetching appointment details:", error);
        }
      };
      fetchDetails();
    }
  }, [phone]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"
        alt="Spa"
        className="form-image"
      />
      <h1>{message}</h1>

      {appointmentDetails ? (
        <div className="appointment-details">
          <h2>Appointment Details</h2>
          <p><strong>Name:</strong> {appointmentDetails.name}</p>
          <p><strong>Phone:</strong> {appointmentDetails.phone}</p>
          <p><strong>Service:</strong> {appointmentDetails.service}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          {appointmentDetails.notes && (
            <p><strong>Notes:</strong> {appointmentDetails.notes}</p>
          )}
        </div>
      ) : (
        ""
      )}

      <div className="button-container">
        <button className="form-button" onClick={handleGoBack}>
          Go to Home
        </button>

        {appointmentDetails && (
          <button className="form-button" onClick={handlePrint}>
            Print Confirmation
          </button>
        )}
      </div>

      {appointmentDetails && (
        <div className="qr-container">
          <h2>Scan to View Details</h2>
          <QRCodeCanvas
            value={`https://spa-booking-backend.onrender.com/confirmation?phone=${phone}`}
            size={128} // Size of the QR code
          />
        </div>
      )}

      <p className="confirmation-text">{note}</p>
    </div>
  );
};

export default ConfirmationPage;
